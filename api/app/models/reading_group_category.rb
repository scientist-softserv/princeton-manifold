class ReadingGroupCategory < ApplicationRecord
  include Authority::Abilities
  include CollectionGrouping
  include CollectsReadingGroupEntries
  include FriendlyId
  include HasFormattedAttributes
  include SerializedAbilitiesFor

  delegate :name, to: :reading_group, allow_nil: true, prefix: true

  friendly_id :slug_candidates, scope: :reading_group, use: %i[scoped slugged]

  has_formatted_attributes :title, :description

  belongs_to :reading_group, inverse_of: :reading_group_categories

  collects_reading_group_entry! "ReadingGroupProject"
  collects_reading_group_entry! "ReadingGroupResource"
  collects_reading_group_entry! "ReadingGroupResourceCollection"
  collects_reading_group_entry! "ReadingGroupText"

  acts_as_list scope: %i[reading_group_id]

  scope :in_order, -> { order(position: :asc) }

  validates :title, :description, presence: true

  private

  def slug_candidates
    fa_cache.title.refresh!

    [
      [:title_plaintext],
      [:reading_group_name, :title_plaintext]
    ]
  end
end
