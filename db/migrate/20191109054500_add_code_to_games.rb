class AddCodeToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :code, :text
  end
end
