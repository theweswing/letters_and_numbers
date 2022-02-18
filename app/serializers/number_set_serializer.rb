class NumberSetSerializer < ActiveModel::Serializer
  attributes :id,
             :bigs,
             :smalls,
             :number_one,
             :number_two,
             :number_three,
             :number_four,
             :number_five,
             :number_six,
             :target
  has_many :number_games
  has_many :number_solutions
end
