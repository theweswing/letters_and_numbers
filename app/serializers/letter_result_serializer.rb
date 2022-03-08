class LetterResultSerializer < ActiveModel::Serializer
  attributes :id, :answer, :score, :accepted
  belongs_to :user
  belongs_to :letter_game
end
