class ProjectSummary < ApplicationRecord
  include Attachments
  include View

  self.primary_key = :id

  belongs_to :project

  manifold_has_attached_file :avatar, :image

  serialize :toc, Array

  def updated?
    updated_at.strftime("%F") != created_at.strftime("%F")
  end

  def creator_ids
    []
  end

  def recently_updated?
    updated? && updated_at >= Time.current - 1.week
  end
end
