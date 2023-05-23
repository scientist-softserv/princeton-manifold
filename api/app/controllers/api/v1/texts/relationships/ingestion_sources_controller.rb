module API
  module V1
    module Texts
      module Relationships
        class IngestionSourcesController < ApplicationController
          before_action :set_text

          resourceful! IngestionSource, authorize_options: { except: [:index] } do
            @text.ingestion_sources.filtered(
              with_pagination!(
                ingestion_source_filter_params
              )
            )
          end

          def index
            @ingestion_sources = load_ingestion_sources
            location = api_v1_text_relationships_ingestion_sources_url(@text)

            render_multiple_resources(
              @ingestion_sources,
              location: location
            )
          end

          def show
            @ingestion_source = load_and_authorize_ingestion_source

            render_single_resource @ingestion_source
          end

          private

          def set_text
            @text = Text.friendly.find(params[:text_id])
          end
        end
      end
    end
  end
end
