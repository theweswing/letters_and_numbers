class RemoveValidFromResults < ActiveRecord::Migration[6.1]
  def change
    remove_column :letter_results, :valid
    add_column :letter_results, :accepted, :boolean
  end
end
