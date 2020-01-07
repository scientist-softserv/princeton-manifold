module ExportStrategies
  # The prepared payload for uploading a {ProjectExport} with an {ExportTarget}
  # (via {ExportStrategies::Selection}) utilizing an {ExportTargetStrategy export strategy}.
  class UploadPayload < Types::FlexibleStruct
    attribute :selection, Types.Instance(ExportStrategies::Selection)
    attribute :export, Types.Instance(ProjectExport)
    attribute :exportation, Types.Instance(ProjectExportation)
    attribute :configuration, Types.Instance(ExportStrategies::Configuration)
    attribute :target, Types.Instance(ExportTarget)
    attribute :target_name, Types::String

    def each_target_directory_component
      return enum_for(__method__) unless block_given?

      target_directory.descend do |part|
        next if part.to_s == "/"

        yield part
      end
    end

    def has_relative_target_directory?
      target_directory.present? && target_directory.relative?
    end

    alias target_path target_name

    # @!attribute [r] source_path
    #
    # The local path to the file on the filesystem.
    #
    # @return [String]
    memoize def source_path
      export.asset_path
    end

    # @!attribute [r] target_directory
    # @return [String]
    memoize def target_directory
      Pathname.new File.dirname target_path
    end

    # @see ExportStrategies::Configuration#upload_with_chosen_strategy!
    # @return [Dry::Monads::Result]
    def upload_with_chosen_strategy!
      configuration.upload_with_chosen_strategy! self
    end
  end
end
