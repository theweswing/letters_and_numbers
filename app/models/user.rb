class User < ApplicationRecord
  has_many :letter_results
  has_many :number_results

  has_many :letter_games, through: :letter_results
  has_many :number_games, through: :number_results

  has_secure_password
  validates :email,
            presence: true,
            uniqueness: true,
            format: {
              with: URI::MailTo::EMAIL_REGEXP,
            }
end
