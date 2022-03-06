class LetterResult < ApplicationRecord
  belongs_to :letter_game
  belongs_to :user
  has_one :challenge
end
