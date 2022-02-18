class LetterResultSerializer < ActiveModel::Serializer
  attributes :id, :answer, :score
  belongs_to :user
  belongs_to :letter_game
end
