class AddDetailsToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :rating, :integer
    add_column :games, :description, :text
    add_column :games, :image_url, :string
  end
end
