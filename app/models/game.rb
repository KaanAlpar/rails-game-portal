class Game < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :selections, dependent: :destroy
  has_many :collections, through: :selections
  validates :title, presence: true, uniqueness: true
end
