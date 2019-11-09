class Selection < ApplicationRecord
  belongs_to :game
  belongs_to :collection
  validates :game, uniqueness: { scope: :collection }
end
