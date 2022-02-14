class ModifyLetterSet < ActiveRecord::Migration[6.1]
  def change
    remove_column :letter_sets, :letter_one
    remove_column :letter_sets, :letter_two
    remove_column :letter_sets, :letter_three
    remove_column :letter_sets, :letter_four
    remove_column :letter_sets, :letter_five
    remove_column :letter_sets, :letter_six
    remove_column :letter_sets, :letter_seven
    remove_column :letter_sets, :letter_eight
    remove_column :letter_sets, :letter_nine
    add_column :letter_sets, :letters, :string
  end
end
