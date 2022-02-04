class CreateLetterResults < ActiveRecord::Migration[6.1]
  def change
    create_table :letter_results do |t|
      t.references :user
      t.references :letter_game
      t.string :answer
      t.string :score
      t.timestamps
    end
  end
end
