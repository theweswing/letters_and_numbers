class CreateChallenges < ActiveRecord::Migration[6.1]
  def change
    create_table :challenges do |t|
      t.references :letter_result_id
      t.boolean :seen
      t.boolean :approved
      t.timestamps
    end
    add_column :letter_results, :valid, :boolean
  end
end
