class LetterGameSerializer < ActiveModel::Serializer
  attributes :date
  belongs_to :letter_set
end
