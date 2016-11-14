# The project model is the primary unit of Manifold.
class Project < ActiveRecord::Base

  # Concerns
  include TrackedCreator
  include Collaborative
  include MoneyAttributes

  # Associations
  belongs_to :published_text, class_name: "Text", optional: true
  has_many :texts, dependent: :destroy
  has_many :text_categories, -> { for_text }, class_name: "Category", dependent: :destroy
  has_many :resource_categories,
           -> { for_resource },
           class_name: "Category",
           dependent: :destroy
  has_many :favorites, as: :favoritable, dependent: :destroy
  has_many :events, -> { order "events.created_at DESC" }, dependent: :destroy
  has_many :resources, dependent: :destroy
  has_many :collections, dependent: :destroy
  has_many :project_subjects
  has_many :subjects, through: :project_subjects

  # Callbacks
  after_commit :trigger_creation_event, on: [:create]

  # Delegations
  delegate :count, to: :collections, prefix: true
  delegate :count, to: :resources, prefix: true

  # Misc
  money_attributes :purchase_price

  # Validation
  validates :purchase_url, url: { allow_nil: true }
  validates :title, presence: true

  # Attachments
  has_attached_file :avatar,
                    include_updated_timestamp: false,
                    default_url: "",
                    url: "/system/:class/:uuid_partition/:id/:style_:filename",
                    styles: {
                      thumb: ["x246", :png]
                    }
  has_attached_file :cover,
                    include_updated_timestamp: false,
                    default_url: "",
                    url: "/system/:class/:uuid_partition/:id/:style_:filename",
                    styles: {
                      hero: ["800", :png]
                    }
  has_attached_file :hero,
                    include_updated_timestamp: false,
                    url: "/system/:class/:uuid_partition/:id/:style_:filename",
                    default_url: "",
                    styles: { background: ["1800", :jpg] }
  validation = Rails.application.config.x.api[:attachments][:validations][:image]
  validates_attachment_content_type :cover, content_type: validation[:allowed_mime]
  validates_attachment_content_type :hero, content_type: validation[:allowed_mime]
  validates_attachment_content_type :avatar, content_type: validation[:allowed_mime]
  validates_attachment_file_name :cover, matches: validation[:allowed_ext]
  validates_attachment_file_name :hero, matches: validation[:allowed_ext]
  validates_attachment_file_name :avatar, matches: validation[:allowed_ext]

  def self.filtered(filters)
    projects = Project.all
    return projects unless filters
    if filters.key? :featured
      projects = projects.where(featured: true) if truthy?(filters[:featured])
      projects = projects.where(featured: false) if falsey?(filters[:featured])
    end
    if filters[:subject]
      projects = projects
                 .joins(:project_subjects)
                 .where(project_subjects: { subject: filters[:subject] })
    end
    projects
  end

  def twitter_following
    return [] unless tweet_fetch_config && tweet_fetch_config["following"].is_a?(Array)
    tweet_fetch_config["following"].map do |h|
      ActiveSupport::HashWithIndifferentAccess.new(h)
    end
  end

  def following_twitter_accounts?
    twitter_following.length.positive?
  end

  def avatar_url
    return nil if avatar.url(:thumb).blank?
    ENV["API_URL"] + avatar.url(:thumb)
  end

  def cover_url
    return nil if cover.url(:hero).blank?
    ENV["API_URL"] + cover.url(:hero)
  end

  def hero_url
    return nil if hero.url(:background).blank?
    ENV["API_URL"] + hero.url(:background)
  end

  def self.truthy?(value)
    return false if [false, "", nil].include? value
    return true if [true, 1, "1"].include? value
    return true if value.casecmp("true").zero?
    false
  end

  def self.falsey?(value)
    !truthy?(value)
  end

  private

  def trigger_creation_event
    Event.trigger(Event::PROJECT_CREATED, self)
  end
end
