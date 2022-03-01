class User < ApplicationRecord
  has_many :letter_results
  has_many :number_results

  has_many :letter_games, through: :letter_results
  has_many :number_games, through: :number_results
  has_one :profile
end
