class CreateNumberResults < ActiveRecord::Migration[6.1]
  def change
    create_table :number_results do |t|
      t.references :user
      t.references :number_game
      t.timestamps
    end
  end
end
