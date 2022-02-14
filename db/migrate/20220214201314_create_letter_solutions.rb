class CreateLetterSolutions < ActiveRecord::Migration[6.1]
  def change
    create_table :letter_solutions do |t|
      t.references :letter_set
      t.integer :length
      t.string :word
      t.timestamps
    end
  end
end
