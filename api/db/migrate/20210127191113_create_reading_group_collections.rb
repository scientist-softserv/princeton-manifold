class CreateReadingGroupCollections < ActiveRecord::Migration[6.0]
  def change
    create_view :reading_group_collections
  end
end
