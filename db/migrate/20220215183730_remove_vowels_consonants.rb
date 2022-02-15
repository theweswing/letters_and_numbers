class RemoveVowelsConsonants < ActiveRecord::Migration[6.1]
  def change
    remove_column :letter_sets, :vowels
    remove_column :letter_sets, :consonants
  end
end
