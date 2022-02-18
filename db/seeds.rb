# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'date'

@bigs = [100, 75, 50, 25]
@smalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
@big_options = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  3,
  3,
]
@operands = %w[+ + - - * * * / / /]
@steps_required = [
  3,
  4,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
]

################## NUMBERS GAME ###################

# spawns set of six numbers, some large and some small, reflective of show's ratio
def spawn_number_set()
  set = []
  number_of_bigs = @big_options.sample(1)[0]
  number_of_smalls = (6 - number_of_bigs)
  bcounter = 1
  scounter = 1
  while bcounter <= number_of_bigs
    given_big = @bigs.sample(1)[0]
    set.push(given_big)
    bcounter = bcounter + 1
  end
  while scounter <= number_of_smalls
    given_small = @smalls.sample(1)[0]
    set.push(given_small)
    scounter = scounter + 1
  end
  return set
end

# Grab one random number from created set to start, then either perform A or B
# A: grab another number and an operand, then perform that operation on our total
# B:, grab two numbers and an operand, perform operand on those numbers, then add result to our array of numbers to be used in a future operation.
# go until array is empty

def two_int_clean_up(index1, index2, set, result)
  set.delete_at(index1)
  set.delete_at(index2)
  set.push(result)
end

def valid_answer?(number, set)
  string = number.to_s
  ones_digit = string[2]
  if number >= 100 && number <= 999 && number % 5 != 0 &&
       set.include?(ones_digit) == false
    return true
  else
    return false
  end
end

def create_number_set_to_db(set, total, solution)
  num_set = NumberSet.new(target: total)
  bigs = 0
  smalls = 0
  counter = 1
  set.each do |num|
    if num == 25 || num == 50 || num == 75 || num == 100
      bigs = bigs + 1
    else
      smalls = smalls + 1
    end
    if counter == 1
      num_set[:number_one] = num
      counter = counter + 1
    elsif counter == 2
      num_set[:number_two] = num
      counter = counter + 1
    elsif counter == 3
      num_set[:number_three] = num
      counter = counter + 1
    elsif counter == 4
      num_set[:number_four] = num
      counter = counter + 1
    elsif counter == 5
      num_set[:number_five] = num
      counter = counter + 1
    elsif counter == 6
      num_set[:number_six] = num
      counter = counter + 1
    end
  end
  num_set[:bigs] = bigs
  num_set[:smalls] = smalls
  step_counter = 1
  solution.each do |step|
    solution_step = NumberSolution.new(step: step_counter, solution: step)
    num_set.number_solutions << solution_step
    step_counter = step_counter + 1
    solution_step.save
  end
  num_set.save
end

def smart_create_target()
  set = spawn_number_set
  steps = @steps_required.sample(1)[0]
  working_numbers = set.sample(steps)
  solution = []
  operating_on = [1, 1, 1, 2, 2]
  previous_operand = ''
  total = working_numbers.slice!(0, 1)[0]
  while working_numbers.length > 0
    operand = @operands.sample(1)[0]
    if operating_on.sample(1)[0] == 1
      given_number = working_numbers.sample(1)[0]
      given_index = working_numbers.index(given_number)
      if operand == '+'
        solution.push("#{total} + #{given_number} = #{total + given_number}")
        total = total + given_number
        working_numbers.delete_at(given_index)
      elsif operand == '-'
        if total > given_number
          solution.push("#{total} - #{given_number} = #{total - given_number}")
          total = total - given_number
          working_numbers.delete_at(given_index)
        else
          next
        end
      elsif operand == '*'
        if (given_number != 1) && (total != 1)
          solution.push("#{total} * #{given_number} =  #{total * given_number}")
          total = total * given_number
          working_numbers.delete_at(given_index)
        else
          next
        end
      elsif operand == '/'
        if (total % given_number == 0 && given_number != 1)
          solution.push("#{total} / #{given_number} = #{total / given_number}")
          total = total / given_number
          working_numbers.delete_at(given_index)
        else
          next
        end
      end
    elsif (operating_on.sample(1)[0] == 2)
      if working_numbers.length >= 2
        two_nums = working_numbers.sample(2)
        index_one = working_numbers.index(two_nums[0])
        index_two = working_numbers.index(two_nums[1])
        if operand == '+'
          sum = two_nums[0] + two_nums[1]
          solution.push("#{two_nums[0]} + #{two_nums[1]} = #{sum}")
          two_int_clean_up(index_one, index_two, working_numbers, sum)
        elsif operand == '-'
          if two_nums[0] > two_nums[1]
            difference = two_nums[0] - two_nums[1]
            two_int_clean_up(index_one, index_two, working_numbers, difference)
            solution.push("#{two_nums[0]} - #{two_nums[1]} = #{difference}")
          elsif two_nums[1] > two_nums[0]
            difference = two_nums[1] - two_nums[0]
            two_int_clean_up(index_one, index_two, working_numbers, difference)
            solution.push("#{two_nums[1]} - #{two_nums[0]} = #{difference}")
          elsif two_nums[1] == two_nums[0]
            next
          end
        elsif operand == '*'
          if (two_nums[1] != 1 && two_nums[0] != 1)
            product = two_nums[0] * two_nums[1]
            two_int_clean_up(index_one, index_two, working_numbers, product)
            solution.push("#{two_nums[0]} * #{two_nums[1]} = #{product}")
          else
            next
          end
        elsif operand == '/'
          if (two_nums[0] % two_nums[1] == 0 && two_nums[1] != 1)
            quotient = two_nums[0] / two_nums[1]
            two_int_clean_up(index_one, index_two, working_numbers, quotient)
            solution.push("#{two_nums[0]} / #{two_nums[1]} = #{quotient}")
          elsif (two_nums[1] % two_nums[0] == 0 && two_nums[0] != 1)
            quotient = two_nums[1] / two_nums[0]
            two_int_clean_up(index_one, index_two, working_numbers, quotient)
            solution.push("#{two_nums[1]} / #{two_nums[0]} = #{quotient}")
          else
            next
          end
        end
      else
        next
      end
    end
  end
  if valid_answer?(total, set)
    create_number_set_to_db(set, total, solution)
    return set, solution, total
  else
    smart_create_target
  end
end

smart_create_target

def mass_create_number_sets(number)
  counter = 1
  sets = []
  while counter <= number
    set = smart_create_target
    if sets.include?(set) == false
      sets.push(set)
      counter += 1
    else
      next
    end
  end
end

################# DICTIONARY ######################
# Parsing OED txt file for a list of words:

@dictionary = []

def read_file(file)
  opened_file = File.open(file)
  file_contents = opened_file.readlines.map(&:chomp)
  opened_file.close
  return file_contents
end

def add_to_dictionary(word)
  clean = remove_numbers(word)
  @dictionary.push(clean.downcase)
  return clean
end

def remove_numbers(word)
  if word.include?('1')
    word.delete!('1')
    return word
  elsif word.include?('2')
    word.delete!('2')
    return word
  elsif word.include?('é')
    word = word.gsub!('é', 'e')
    return word
  else
    return word
  end
end

def parse_dictionary(file)
  dic = read_file(file)
  dic.each do |given_entry|
    if given_entry.length > 1
      word = grab_word(given_entry)
      grab_forms(given_entry, word)
    end
  end
  dictionary = @dictionary.uniq
  return dictionary.sort
end

def grab_word(entry)
  contents = entry.split(' ')
  if contents[1] != 'abbr.' && valid_word(contents[0]) == true
    word = add_to_dictionary(contents[0])
    return word
  end
end

def grab_forms(entry, word)
  contents = entry.split(' ')
  if word
    grab_verb_variations(contents, word)
    grab_comparative_suffixes(contents, word)
  end
  contents.each_with_index do |text, index|
    grab_alt_forms(contents, word, text, index)
  end
end

def grab_alt_forms(contents, word, text, index)
  if text === 'n.'
    noun = contents[index - 1]
    add_to_dictionary(noun) if (valid_word(noun) == true)
  elsif text === 'adj.'
    adjective = contents[index - 1]
    add_to_dictionary(adjective) if (valid_word(adjective) == true)
  elsif text === 'adv.'
    adverb = contents[index - 1]
    add_to_dictionary(adverb) if (valid_word(adverb) == true)
  elsif text === 'v.'
    verb = contents[index - 1]
    add_to_dictionary(verb) if (valid_word(verb) == true)
  elsif text === '(pl.'
    grab_plural(contents, word, text, index)
  end
end

def grab_verb_variations(entry, word)
  if entry[1] == 'v.'
    suffix_finder(word, 's', 'sing') if entry.include?('(-sing)')
    suffix_finder(word, 't', 'ting') if entry.include?('(-ting)')
  end
end

def grab_plural(entry, word, text, index)
  if word
    if entry[index + 1] == '-s)'
      plural = word + 's'
      add_to_dictionary(plural)
    elsif entry[index + 1] == 'Same' && entry[index + 3] == '-s)'
      plural = word + 's'
      add_to_dictionary(plural)
    elsif entry[index + 1] == '-cuses)'
      plural = word + 'es'
      add_to_dictionary(plural)
    elsif entry[index + 1] == '-ies)'
      suffix_finder(word, 'y', 'ies')
    end
  end
end

def grab_comparative_suffixes(entry, word)
  suffix_finder(word, 'y', 'ier') if entry.include?('(-ier,')
  if entry.include?('-iest)') || entry.include?('-iest)')
    suffix_finder(word, 'y', 'iest')
  end
end

def suffix_finder(word, find, replace)
  counter = word.length - 1
  while counter >= 0
    if word[counter] == find
      new_word = word.slice(0, counter) + replace
      add_to_dictionary(new_word)
      return new_word
      break
    else
      counter = counter - 1
    end
  end
end

def valid_word(word)
  comparison = word.downcase
  if comparison.include?('-')
    return false
  elsif comparison.include?('.')
    return false
  elsif comparison.include?("'")
    return false
  elsif comparison.include?('/')
    return false
  elsif comparison.include?('[')
    return false
  elsif comparison.include?(']')
    return false
  elsif comparison.include?('*')
    return false
  elsif comparison.include?('(')
    return false
  elsif comparison.include?(')')
    return false
  elsif comparison.include?('a') == false &&
        comparison.include?('e') == false &&
        comparison.include?('i') == false &&
        comparison.include?('u') == false &&
        comparison.include?('o') == false && comparison.include?('y') == false
    return false
  elsif comparison.length <= 1
    return false
  else
    return true
  end
end

parse_dictionary('./oxford_english_dictionary.txt')

######################################################################################

def word_includes_letters?(word, letters)
  word.each do |given_letter|
    if letters.count(given_letter) == word.count(given_letter)
      next
    else
      return false
    end
  end
  return true
end

class DicWord
  @@length9 = []
  @@length8 = []
  @@length7 = []
  @@length6 = []
  @@length5 = []
  @@length4 = []
  @@length3 = []
  @@length2 = []
  @@all = []

  def initialize(word, length)
    @word = word
    @length = length
    @@all << self
    if length == 9
      @@length9 << self
    elsif length == 8
      @@length8 << self
    elsif length == 7
      @@length7 << self
    elsif length == 6
      @@length6 << self
    elsif length == 5
      @@length5 << self
    elsif length == 4
      @@length4 << self
    elsif length == 3
      @@length3 << self
    elsif length == 2
      @@length2 << self
    end
  end

  def word
    return @word
  end

  def self.all
    return @@all
  end

  def self.nines
    return @@length9
  end

  def self.eights
    return @@length8
  end

  def self.sevens
    return @@length7
  end

  def self.sixes
    return @@length6
  end

  def self.fives
    return @@length5
  end

  def self.fours
    return @@length4
  end

  def self.threes
    return @@length3
  end

  def self.twos
    return @@length2
  end
end

def find_all_letter_sets()
  @dictionary.each { |word| DicWord.new(word, word.length) }
  all_nines = DicWord.nines
  successes = []
  db_counter = 1
  all_nines.uniq.shuffle.each do |nine_lw|
    counter = 0
    eight_lws = []
    seven_lws = []
    six_lws = []
    five_lws = []
    four_lws = []
    three_lws = []
    two_lws = []
    split = nine_lw.word.split('')
    if LetterSet.find_by(letters: split.sort.join) == nil
      DicWord.eights.uniq.each do |eight_lw|
        comp_split = eight_lw.word.split('')
        if word_includes_letters?(comp_split, split)
          eight_lws.push(eight_lw.word)
        else
          next
        end
      end
      if eight_lws.length > 0
        DicWord.sevens.uniq.each do |seven_lw|
          comp_split = seven_lw.word.split('')
          if word_includes_letters?(comp_split, split)
            seven_lws.push(seven_lw.word)
          else
            next
          end
        end
        if seven_lws.length > 0
          DicWord.sixes.uniq.each do |six_lw|
            comp_split = six_lw.word.split('')
            if word_includes_letters?(comp_split, split)
              six_lws.push(six_lw.word)
            else
              next
            end
          end
          if six_lws.length > 0
            DicWord.fives.uniq.each do |five_lw|
              comp_split = five_lw.word.split('')
              if word_includes_letters?(comp_split, split)
                five_lws.push(five_lw.word)
              else
                next
              end
            end
            if five_lws.length > 0
              DicWord.fours.uniq.each do |four_lw|
                comp_split = four_lw.word.split('')
                if word_includes_letters?(comp_split, split)
                  four_lws.push(four_lw.word)
                else
                  next
                end
              end
              if four_lws.length > 0
                DicWord.threes.uniq.each do |three_lw|
                  comp_split = three_lw.word.split('')
                  if word_includes_letters?(comp_split, split)
                    three_lws.push(three_lw.word)
                  else
                    next
                  end
                end
                if three_lws.length > 0
                  DicWord.twos.uniq.each do |two_lw|
                    comp_split = two_lw.word.split('')
                    if word_includes_letters?(comp_split, split)
                      two_lws.push(two_lw.word)
                    else
                      next
                    end
                  end
                  entry = {
                    word: nine_lw.word,
                    eights: eight_lws.uniq.length,
                    sevens: seven_lws.uniq.length,
                    sixes: six_lws.uniq.length,
                    fives: five_lws.uniq.length,
                    fours: four_lws.uniq.length,
                    threes: three_lws.uniq.length,
                    twos: two_lws.uniq.length,
                  }
                  letter_set = LetterSet.create(letters: split.sort.join)
                  perfect_solution =
                    LetterSolution.create(word: entry[:word], length: 9)
                  letter_set.letter_solutions << perfect_solution
                  pp(db_counter)
                  pp(nine_lw)
                  db_counter = db_counter + 1
                  eight_lws.each do |eight_lw|
                    letter_solution =
                      LetterSolution.create(word: eight_lw, length: 8)
                    letter_set.letter_solutions << letter_solution
                  end
                  seven_lws.each do |seven_lw|
                    letter_solution =
                      LetterSolution.create(word: seven_lw, length: 7)
                    letter_set.letter_solutions << letter_solution
                  end
                  six_lws.each do |six_lw|
                    letter_solution =
                      LetterSolution.create(word: six_lw, length: 6)
                    letter_set.letter_solutions << letter_solution
                  end
                  five_lws.each do |five_lw|
                    letter_solution =
                      LetterSolution.create(word: five_lw, length: 5)
                    letter_set.letter_solutions << letter_solution
                  end
                  four_lws.each do |four_lw|
                    letter_solution =
                      LetterSolution.create(word: four_lw, length: 4)
                    letter_set.letter_solutions << letter_solution
                  end
                  three_lws.each do |three_lw|
                    letter_solution =
                      LetterSolution.create(word: three_lw, length: 3)
                    letter_set.letter_solutions << letter_solution
                  end
                  two_lws.each do |two_lw|
                    letter_solution =
                      LetterSolution.create(word: two_lw, length: 2)
                    letter_set.letter_solutions << letter_solution
                  end
                  next
                end
              end
            end
          end
        end
      end
    end
  end
end

def populate_db()
  today = Date.today
  find_all_letter_sets
  total_sets = LetterSet.all.length
  mass_create_number_sets(total_sets)
  letter_sets = LetterSet.all.shuffle
  number_sets = NumberSet.all.shuffle
  counter = 0
  while counter <= total_sets - 1
    given_letter_set = letter_sets[counter]
    given_number_set = number_sets[counter]
    date = today + counter
    LetterGame.create(date: date, letter_set_id: given_letter_set[:id])
    NumberGame.create(date: date, number_set_id: given_number_set[:id])
    counter = counter + 1
  end
end

populate_db

LetterGame.create(
  date: Date.parse('1991-10-17'),
  letter_set_id: LetterSet.last[:id],
)

NumberGame.create(
  date: Date.parse('1991-10-17'),
  number_set_id: NumberSet.last[:id],
)
