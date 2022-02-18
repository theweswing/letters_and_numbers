class NumberResultSerializer < ActiveModel::Serializer
  attributes :id, :answer, :score
  belongs_to :user
  belongs_to :number_game
end
