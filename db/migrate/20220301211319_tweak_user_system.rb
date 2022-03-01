class TweakUserSystem < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :email
    remove_column :users, :password_digest
  end
end
