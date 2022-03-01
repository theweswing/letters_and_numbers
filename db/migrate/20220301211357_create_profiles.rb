class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :email
      t.string :password_digest
      t.references :user
      t.timestamps
    end
  end
end
