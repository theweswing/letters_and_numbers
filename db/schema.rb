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

ActiveRecord::Schema.define(version: 2022_03_07_205537) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "challenges", force: :cascade do |t|
    t.bigint "letter_result_id_id"
    t.boolean "seen"
    t.boolean "approved"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["letter_result_id_id"], name: "index_challenges_on_letter_result_id_id"
  end

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
    t.boolean "accepted"
    t.index ["letter_game_id"], name: "index_letter_results_on_letter_game_id"
    t.index ["user_id"], name: "index_letter_results_on_user_id"
  end

  create_table "letter_sets", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "letters"
  end

  create_table "letter_solutions", force: :cascade do |t|
    t.bigint "letter_set_id"
    t.integer "length"
    t.string "word"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["letter_set_id"], name: "index_letter_solutions_on_letter_set_id"
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
    t.integer "answer"
    t.integer "score"
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

  create_table "number_solutions", force: :cascade do |t|
    t.bigint "number_set_id"
    t.integer "step"
    t.string "solution"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["number_set_id"], name: "index_number_solutions_on_number_set_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
