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

s1 = spawn_number_set

# Grab one random number from created set to start, then either perform A or B
# A: grab another number and an operand, then perform that operation on our total
# B:, grab two numbers and an operand, perform operand on those numbers, then add result to our array of numbers to be used in a future operation.
# go until array is empty

def smart_create_target(set)
  operands = %w[+ + - - * * * / / /]
  steps_required = [3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6]
  steps = steps_required.sample(1)[0]
  working_numbers = set.sample(steps)
  solution = []
  operating_on = [1, 1, 1, 2, 2]
  previous_operand = ''
  total = working_numbers.slice!(0, 1)[0]
  pp(set)
  while working_numbers.length > 0
    operand = operands.sample(1)[0]
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
          working_numbers.delete_at(index_one)
          working_numbers.delete_at(index_two)
          working_numbers.push(sum)
        elsif operand == '-'
          if two_nums[0] > two_nums[1]
            difference = two_nums[0] - two_nums[1]
            working_numbers.delete_at(index_one)
            working_numbers.delete_at(index_two)
            working_numbers.push(difference)
            solution.push("#{two_nums[0]} - #{two_nums[1]} = #{difference}")
          elsif two_nums[1] > two_nums[0]
            difference = two_nums[1] - two_nums[0]
            working_numbers.delete_at(index_one)
            working_numbers.delete_at(index_two)
            working_numbers.push(difference)
            solution.push("#{two_nums[1]} - #{two_nums[0]} = #{difference}")
          elsif two_nums[1] == two_nums[0]
            next
          end
        elsif operand == '*'
          if (two_nums[1] != 1 && two_nums[0] != 1)
            product = two_nums[0] * two_nums[1]
            working_numbers.delete_at(index_one)
            working_numbers.delete_at(index_two)
            working_numbers.push(product)
            solution.push("#{two_nums[0]} * #{two_nums[1]} = #{product}")
          else
            next
          end
        elsif operand == '/'
          if (two_nums[0] % two_nums[1] == 0 && two_nums[1] != 1)
            quotient = two_nums[0] / two_nums[1]
            working_numbers.delete_at(index_one)
            working_numbers.delete_at(index_two)
            working_numbers.push(quotient)
            solution.push("#{two_nums[0]} / #{two_nums[1]} = #{quotient}")
          elsif (two_nums[1] % two_nums[0] == 0 && two_nums[0] != 1)
            quotient = two_nums[1] / two_nums[0]
            working_numbers.delete_at(index_one)
            working_numbers.delete_at(index_two)
            working_numbers.push(quotient)
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
  if total >= 100 && total <= 999
    pp(total)
    pp(solution)
    return solution, total
  else
    smart_create_target(set)
  end
end

smart_create_target(s1)

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

#######################################

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

def anagram_finder(set)
  pp("letters: #{set}")
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
    if (split - set).empty?
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
  pp('2s:')
  pp(twos.uniq)
  pp('3s:')
  pp(threes.uniq)
  pp('4s:')
  pp(fours.uniq)
  pp('5s:')
  pp(fives.uniq)
  pp('6s:')
  pp(sixes.uniq)
  pp('7s:')
  pp(sevens.uniq)
  pp('8s:')
  pp(eights.uniq)
  pp('9s:')
  pp(nines.uniq)
end

anagram_finder(s2)
