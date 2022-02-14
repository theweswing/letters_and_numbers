class NumberSet < ApplicationRecord
  has_many :number_games
  has_many :number_solutions
end
