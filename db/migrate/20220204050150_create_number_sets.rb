class CreateNumberSets < ActiveRecord::Migration[6.1]
  def change
    create_table :number_sets do |t|
      t.integer :bigs
      t.integer :smalls
      t.integer :target
      t.integer :number_one
      t.integer :number_two
      t.integer :number_three
      t.integer :number_four
      t.integer :number_five
      t.integer :number_six
      t.string :solution
      t.timestamps
    end
  end
end
