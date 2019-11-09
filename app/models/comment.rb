class Comment < ApplicationRecord
  belongs_to :game
  validates :username, presence: true
  validates :content, presence: true, uniqueness: true
end
