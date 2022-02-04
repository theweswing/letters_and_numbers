class CreateNumberGames < ActiveRecord::Migration[6.1]
  def change
    create_table :number_games do |t|
      t.date :date
      t.references :number_set
      t.timestamps
    end
  end
end
