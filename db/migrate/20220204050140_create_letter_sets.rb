class CreateLetterSets < ActiveRecord::Migration[6.1]
  def change
    create_table :letter_sets do |t|
      t.integer :vowels
      t.integer :consonants
      t.string :letter_one
      t.string :letter_two
      t.string :letter_three
      t.string :letter_four
      t.string :letter_five
      t.string :letter_six
      t.string :letter_seven
      t.string :letter_eight
      t.string :letter_nine
      t.timestamps
    end
  end
end
