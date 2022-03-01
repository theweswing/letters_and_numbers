class Profile < ApplicationRecord
  belongs_to :user
  has_secure_password
  validates :email,
            uniqueness: true,
            format: {
              with: URI::MailTo::EMAIL_REGEXP,
            }
end
