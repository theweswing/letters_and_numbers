class NumberGame < ApplicationRecord
  belongs_to :number_set
  has_many :number_results
end
