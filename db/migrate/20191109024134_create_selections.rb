class CreateSelections < ActiveRecord::Migration[5.2]
  def change
    create_table :selections do |t|
      t.references :game, foreign_key: true
      t.references :collection, foreign_key: true

      t.timestamps
    end
  end
end
