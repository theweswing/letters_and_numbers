class LetterSet < ApplicationRecord
  has_many :letter_games
  has_many :letter_solutions
  validates :letters, uniqueness: true
end
