module API
  module V1
    module ReadingGroups
      module Relationships
        # rubocop:disable Metrics/AbcSize
        module Collectable
          extend ActiveSupport::Concern

          include ActiveSupport::Configurable

          included do
            config_accessor :collectable_model

            config_accessor :collectable_scopes do
              []
            end

            config_accessor :collectable_definition

            delegate :model_name, to: :collectable_model, prefix: :collectable
          end

          def index
            @models = load_resources

            location = build_location_url_for collectable_model

            render_multiple_resources(
              @models,
              include: collectable_scopes,
              location: location
            )
          end

          def build_location_url_for(target = collectable_model)
            url_for([:api, :v1, @reading_group, :relationships, target])
          end

          module ClassMethods
            # @param [Class] klass
            # @return [void]
            def define_resourceful_scope_for!(klass)
              config.collectable_model = klass

              filter_params_name = filter_param_method_for(klass) || :params

              config.filter_params_name = filter_params_name

              config.collectable_definition = Collections::Mapping[ReadingGroup][klass]

              association_name = collectable_definition.collectable_associations.uncategorized_collectables

              resourceful! klass do
                if klass < ::Filterable
                  klass.filtered(
                    with_pagination!(public_send(filter_params_name)),
                    scope: @reading_group.public_send(association_name)
                  )
                else
                  @reading_group.public_send(association_name)
                end
              end
            end

            # @param [<Symbol, { Symbol => Symbol, <Symbol> }>] scopes
            # @return [void]
            def include_scopes!(*scopes)
              config.collectable_scopes = scopes
            end
          end
        end
        # rubocop:enable Metrics/AbcSize
      end
    end
  end
end
