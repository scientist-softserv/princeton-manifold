class UpdateTextSummariesToVersion6 < ActiveRecord::Migration[6.0]
  def change
    update_view :text_summaries, version: 6, revert_to_version: 5
  end
end
