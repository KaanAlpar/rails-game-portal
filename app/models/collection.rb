class Collection < ApplicationRecord
  has_many :selections, dependent: :destroy
  has_many :games, through: :selections
  validates :name, presence: true, uniqueness: true
end
