class AddToNumberResults < ActiveRecord::Migration[6.1]
  def change
    add_column :number_results, :answer, :integer
    add_column :number_results, :score, :integer
  end
end
