require 'pry'

def spawnNumberSet()
  bigs = [100, 75, 50, 25]
  smalls = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  big_options = [0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4]
  set = []

  #   solution = []
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

def create_target(set)
  operands = %w[+ - * /]
  requirements = [3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6]
  steps = requirements.sample(1)[0]
  working_numbers = set.sample(steps)
  pp(working_numbers)
  solution = []
  scounter = 1
  total = working_numbers.slice!(0, 1)[0]
  working_numbers.each_with_index do |given_number, index|
    operand = operands.sample(1)[0]
    if operand == '+'
      solution.push("#{total} + #{given_number} = #{total + given_number}")
      total = total + given_number
    elsif operand == '-'
      if total > given_number
        solution.push("#{total} - #{given_number} = #{total - given_number}")
        total = total - given_number
      else
        working_numbers.insert(index + 1, given_number)
        next
      end
    elsif operand == '*'
      solution.push("#{total} * #{given_number} =  #{total * given_number}")
      total = total * given_number
    elsif operand == '/'
      if total % given_number == 0 && given_number!==1
        solution.push("#{total} / #{given_number} = #{total / given_number}")
        total = total / given_number
      else
        working_numbers.insert(index + 1, given_number)
        next
      end
    end
  end
  if total >= 100 && total <= 999
    pp(solution)
    pp(total)
    return solution, total
  else
    create_target(set)
  end
end

s1 = spawnNumberSet
pp(s1)

create_target(s1)
