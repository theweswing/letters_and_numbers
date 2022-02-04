class LetterGame < ApplicationRecord
  belongs_to :letter_set
  has_many :letter_results
end
