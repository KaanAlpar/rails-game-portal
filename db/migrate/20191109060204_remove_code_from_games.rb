class RemoveCodeFromGames < ActiveRecord::Migration[5.2]
  def change
    remove_column :games, :code, :text
  end
end
