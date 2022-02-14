class CreateNumberSolutions < ActiveRecord::Migration[6.1]
  def change
    create_table :number_solutions do |t|
      t.references :number_set
      t.integer :step
      t.string :solution
      t.timestamps
    end
  end
end
