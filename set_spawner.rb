require 'pry'

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
# @vowels = %w[a e i o u]
# @consonants = %w[b c d f g h j k l m n p q r s t v w x y z]
@vowels = %w[
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  a
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  e
  i
  i
  i
  i
  i
  i
  i
  i
  i
  i
  i
  i
  i
  o
  o
  o
  o
  o
  o
  o
  o
  o
  o
  o
  o
  o
  u
  u
  u
  u
  u
]
@consonants = %w[
  b
  b
  c
  c
  c
  d
  d
  d
  d
  d
  d
  f
  f
  g
  g
  g
  h
  h
  j
  k
  l
  l
  l
  l
  l
  m
  m
  m
  m
  n
  n
  n
  n
  n
  n
  n
  n
  p
  p
  p
  p
  q
  r
  r
  r
  r
  r
  r
  r
  r
  r
  s
  s
  s
  s
  s
  s
  s
  s
  s
  t
  t
  t
  t
  t
  t
  t
  t
  t
  v
  w
  x
  y
  z
]
@vowel_options = [
  3,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  5,
  5,
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
        if (given_number != 1)
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
    pp(set)
    pp(total)
    return set, solution, total
  else
    smart_create_target
  end
end

smart_create_target

def mass_create_number_sets()
  counter = 1
  sets = []
  while counter <= 365
    set = smart_create_target
    if sets.include?(set) == false
      sets.push(set)
      counter += 1
    else
      next
    end
  end
  pp(sets)
end

mass_create_number_sets

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

def spawn_letter_set()
  set = []
  number_of_vowels = @vowel_options.sample(1)[0]
  number_of_consonants = 9 - number_of_vowels
  vcounter = 1
  ccounter = 1
  while vcounter <= number_of_vowels
    given_vowel = @vowels.sample(1)[0]
    set.push(given_vowel)
    vcounter = vcounter + 1
  end
  while ccounter <= number_of_consonants
    given_cons = @consonants.sample(1)[0]
    set.push(given_cons)
    ccounter = ccounter + 1
  end
  return set
end

s2 = spawn_letter_set

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

def anagram_finder(set)
  twos = []
  threes = []
  fours = []
  fives = []
  sixes = []
  sevens = []
  eights = []
  nines = []
  @dictionary.each do |word|
    split = word.split('')
    if word_includes_letters?(split, set)
      if word.length == 2
        twos.push(word)
      elsif word.length == 3
        threes.push(word)
      elsif word.length == 4
        fours.push(word)
      elsif word.length == 5
        fives.push(word)
      elsif word.length == 6
        sixes.push(word)
      elsif word.length == 7
        sevens.push(word)
      elsif word.length == 8
        eights.push(word)
      elsif word.length == 9
        nines.push(word)
      end
    end
  end
  if sixes.length > 0 && sevens.length > 0 && eights.length > 0 &&
       nines.length > 0
    matches = {
      twos: twos.uniq,
      threes: threes.uniq,
      fours: fours.uniq,
      fives: fives.uniq,
      sixes: sixes.uniq,
      sevens: sevens.uniq,
      eights: eights.uniq,
      nines: nines.uniq,
    }
    return matches
  else
    new_set = spawn_letter_set
    anagram_finder(new_set)
  end
end

# anagram_finder(s2)

def mass_create_letter_sets()
  counter = 1
  sets = []
  while counter < 365
    set = spawn_letter_set
    matches = anagram_finder(set)
    if sets.include?(matches[:nines]) == false
      sets.push(matches[:nines])
      counter = counter + 1
    else
      next
    end
  end
  pp(sets)
end

# quality_control

def check_q_c(words)
  words.each_with_object(Hash.new(0)) { |word, counts| counts[word] += 1 }
end

first_sample = %w[
  manifesto
  bandolier
  grenadier
  greetings
  grenadier
  cortisone
  gasometer
  patronize
  poetaster
  greediest
  rusticate
  tribesman
  irateness
  caparison
  laundries
  ordinance
  depletion
  signature
  reinstate
  remainder
  centuries
  patronize
  probative
  eglantine
  inelegant
  antiserum
  saintlier
  epidermal
  dreariest
  numerical
  cremation
  tramlines
  dissenter
  tiredness
  signature
  factories
  scenarios
  serration
  unspoiled
  saturnine
  insensate
  nursemaid
  antipodes
  germinate
  gaberdine
  remission
  deficient
  pearliest
  departure
  amnesties
  meatiness
  fornicate
  remission
  pantihose
  selection
  essential
  unspoiled
  draftiest
  coastline
  sectional
  inspector
  selection
  elastomer
  dreariest
  policeman
  reuniting
  transpose
  probation
  essential
  appertain
  esperanto
  laundries
  digestion
  irateness
  digestion
  essential
  veracious
  grandiose
  amplifier
  antipodes
  serration
  resonance
  greediest
  indicator
  imposture
  coastline
  sectional
  greediest
  remission
  desertion
  batteries
  catteries
  limestone
  milestone
  disrepute
  disrepute
  seduction
  careerist
  traceries
  serration
  careerist
  traceries
  bandolier
  nursemaid
  hindrance
  caparison
  advertise
]

# pp(check_q_c(first_sample))

def initial_seed()
  letter_sets = mass_create_letter_sets
  number_sets = mass_create_number_sets
end

initial_seed
