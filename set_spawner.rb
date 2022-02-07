require 'pry'

def spawnNumberSet()
  bigs = [100, 75, 50, 25]
  smalls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  big_options = [
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
  set = []
  number_of_bigs = big_options.sample(1)[0]
  number_of_smalls = (6 - number_of_bigs)
  bcounter = 1
  scounter = 1
  while bcounter <= number_of_bigs
    given_big = bigs.sample(1)[0]
    set.push(given_big)
    bcounter = bcounter + 1
  end
  while scounter <= number_of_smalls
    given_small = smalls.sample(1)[0]
    set.push(given_small)
    scounter = scounter + 1
  end
  return set
end

s1 = spawnNumberSet

# set of numbers
# grab one as first number
# from there: either grab one and an operand, then perform that operation on our living total
# OR, grab two, operand them, then use their result on our living total
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

def grab_contents(file)
  opened_file = File.open(file)
  file_contents = opened_file.readlines.map(&:chomp)
  opened_file.close
  return file_contents
end

# pp(grab_contents('./o_e_d.txt'))

def grab_first_word(file)
  dictionary = grab_contents('./o_e_d.txt')
  dictionary.each do |given_line|
    if given_line.length > 0
      first_white = given_line.index(' ')
      word = given_line.slice(0..first_white)
      clean = word.chop
      last_character = clean[clean.length - 1]
      if clean != ''
        while clean[last_character] == ' ' || clean[last_character] == '1' ||
                clean[last_character] == '2'
          clean = clean.chop
          last_character = clean[clean.length - 1]
        end
      end
      pp(clean) if clean.length > 1 && clean_word(clean) == true
    end
  end
end

def clean_word(word)
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

def parse_line(dic_entry)
  if dic_entry.length > 0
    entry = dic_entry.split(' ')
    word = entry.slice!(0, 1)[0]
    if word
      if (clean_word(word) == true)
        if word.include?('1') || word.include?('2')
          clean = word.chop
          pp(clean)
        else
          pp(word)
        end
      end
    end
    if entry[0] == 'n.' || entry[0] == 'v.'
      if entry.include?('(pl.') == false
        plural = word + 's'
        pp("simple plural: #{plural}")
      end
    end
    entry.delete_at(0)
    entry.each_with_index do |text, index|
      if text === 'n.'
        noun = entry[index - 1]
        if (clean_word(noun) == true)
          pp("noun derived from #{word}:")
          pp(noun)
        end
      elsif text === 'adj.'
        adjective = entry[index - 1]
        if (clean_word(adjective) == true)
          pp("adjective derived from #{word}:")
          pp(adjective)
        end
      elsif text === 'adv.'
        adverb = entry[index - 1]
        if (clean_word(adverb) == true)
          pp("adverb derived from #{word}:")
          pp(adverb)
        end
      elsif text === 'v.'
        verb = entry[index - 1]
        if (clean_word(verb) == true)
          pp("verb derived from #{word}:")
          pp(verb)
        end
      elsif text === '(pl.'
        handle_plurals(entry, word, text, index)
      end
    end
  end
end

def handle_plurals(entry, word, text, index)
  if entry[index + 1] == '-s)'
    plural = word + 's'
    pp("plural of #{word}: #{plural}")
  elsif entry[index + 1] == '-ies)'
    counter = word.length - 1
    while counter >= 0
      if word[counter] == 'y'
        base = word.slice(0, counter - 1)
        plural = base + 'ies'
        pp("plural of #{word}: #{plural}")
        break
      else
        counter = counter - 1
      end
    end
  end
end

def grab_first_word_easy(file)
  dictionary = grab_contents(file)
  dictionary.each { |given_line| parse_line(given_line) }
end

# grab_first_word('./o_e_d.txt')
# pp(clean_word('leg-of-mutton'))

grab_first_word_easy('./o_e_d.txt')

###########################################################################################
# def create_target(set)
#   operands = %w[+ - * /]
#   requirements = [3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6]
#   steps = requirements.sample(1)[0]
#   working_numbers = set.sample(steps)
#   pp(working_numbers)
#   solution = []
#   scounter = 1
#   total = working_numbers.slice!(0, 1)[0]
#   working_numbers.each_with_index do |given_number, index|
#     operand = operands.sample(1)[0]
#     if operand == '+'
#       solution.push("#{total} + #{given_number} = #{total + given_number}")
#       total = total + given_number
#     elsif operand == '-'
#       if total > given_number
#         solution.push("#{total} - #{given_number} = #{total - given_number}")
#         total = total - given_number
#       else
#         working_numbers.insert(index + 1, given_number)
#         next
#       end
#     elsif operand == '*'
#       solution.push("#{total} * #{given_number} =  #{total * given_number}")
#       total = total * given_number
#     elsif operand == '/'
#       if total % given_number == 0 && given_number !== 1
#         solution.push("#{total} / #{given_number} = #{total / given_number}")
#         total = total / given_number
#       else
#         working_numbers.insert(index + 1, given_number)
#         next
#       end
#     end
#   end
#   if total >= 100 && total <= 999
#     pp(solution)
#     pp(total)
#     return solution, total
#   else
#     create_target(set)
#   end
# end
