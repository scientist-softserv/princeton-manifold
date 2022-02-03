class JournalAuthorizer < ApplicationAuthorizer
  expose_abilities [:read_drafts, :update_makers, :fully_read]

  # First, we check to see if the journal is a draft. If so, {#drafts_readable_by? it must be readable}.
  # Otherwise, we allow a journal to be read.
  #
  # @see #drafts_readable_by
  # @see #fully_readable_by?
  # @param [User] user
  # @param [Hash] _options
  def readable_by?(user, options = {})
    return drafts_readable_by?(user, options) if resource.draft?

    true
  end

  # All backend user types can edit journals, plus editors of the specific journal.
  #
  # @param [User] user
  # @param [Hash] _options
  def updatable_by?(user, _options = {})
    has_any_role? user, :admin, :editor, :marketeer, :project_editor
  end

  def journal_administered_by?(user, _options = {})
    creator_or_has_editor_permissions?(user, resource)
  end

  alias permissions_creatable_by? journal_administered_by?
  alias permissions_manageable_by? journal_administered_by?

  # {RoleName::Admin Admins} and {RoleName::Editor editors} can delete any journal.
  #
  # {RoleName::ProjectEditor Project editors} can delete any journalthat they have access to.
  #
  # @param [User] user
  # @param [Hash] _options
  def deletable_by?(user, _options = {})
    has_any_role? user, :admin, :editor, :project_editor
  end

  # @see RoleName.draft_access
  # @param [User] user
  # @param [Hash] _options
  def drafts_readable_by?(user, _options = {})
    has_any_role? user, *RoleName.draft_access
  end

  def fully_readable_by?(_user, _options = {})
    true
  end

  class << self
    # Any user who is a project_editor might be able to create, update, or delete it.
    #
    # @param [Symbol] _adjective
    # @param [User] _user
    # @param [Hash] _options
    def default(_adjective, _user, _options = {})
      true
    end

    # Only admins, editors, and project creators can create journals.
    #
    # @param [User] user
    # @param [Hash] _options
    def creatable_by?(user, _options = {})
      project_creator_permissions?(user)
    end

    # {RoleName::Admin Admins} and {RoleName::Editor editors} can delete any journals.
    #
    # {RoleName::ProjectEditor Project editors} can delete any project that they have access to.
    #
    # @param [User] user
    # @param [Hash] _options
    def deletable_by?(user, _options = {})
      has_any_role? user, :admin, :editor, :project_editor
    end

    # @see .marketeer_permissions?
    # @param [User] user
    # @param [Hash] _options
    def drafts_readable_by?(user, _options = {})
      marketeer_permissions?(user)
    end

    # @see Project.build_read_ability_scope_for
    # @param [User] user
    # @param [Hash] _options
    def fully_readable_by(_user, _options = {})
      true
    end
  end
end