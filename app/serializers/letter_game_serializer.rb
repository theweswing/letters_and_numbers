class LetterGameSerializer < ActiveModel::Serializer
  attributes :date, :id
  belongs_to :letter_set
end
