class LetterSetSerializer < ActiveModel::Serializer
  attributes :id, :letters
  has_many :letter_solutions
end
