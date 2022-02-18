class NumberGameSerializer < ActiveModel::Serializer
  attributes :id, :date
  belongs_to :number_set
end
