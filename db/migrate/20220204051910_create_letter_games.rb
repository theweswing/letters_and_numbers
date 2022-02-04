class CreateLetterGames < ActiveRecord::Migration[6.1]
  def change
    create_table :letter_games do |t|
      t.date :date
      t.references :letter_set
      t.timestamps
    end
  end
end
