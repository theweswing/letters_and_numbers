# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_04_051931) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "letter_games", force: :cascade do |t|
    t.date "date"
    t.bigint "letter_set_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["letter_set_id"], name: "index_letter_games_on_letter_set_id"
  end

  create_table "letter_results", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "letter_game_id"
    t.string "answer"
    t.string "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["letter_game_id"], name: "index_letter_results_on_letter_game_id"
    t.index ["user_id"], name: "index_letter_results_on_user_id"
  end

  create_table "letter_sets", force: :cascade do |t|
    t.integer "vowels"
    t.integer "consonants"
    t.string "letter_one"
    t.string "letter_two"
    t.string "letter_three"
    t.string "letter_four"
    t.string "letter_five"
    t.string "letter_six"
    t.string "letter_seven"
    t.string "letter_eight"
    t.string "letter_nine"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "number_games", force: :cascade do |t|
    t.date "date"
    t.bigint "number_set_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["number_set_id"], name: "index_number_games_on_number_set_id"
  end

  create_table "number_results", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "number_game_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["number_game_id"], name: "index_number_results_on_number_game_id"
    t.index ["user_id"], name: "index_number_results_on_user_id"
  end

  create_table "number_sets", force: :cascade do |t|
    t.integer "bigs"
    t.integer "smalls"
    t.integer "target"
    t.integer "number_one"
    t.integer "number_two"
    t.integer "number_three"
    t.integer "number_four"
    t.integer "number_five"
    t.integer "number_six"
    t.string "solution"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
