def find_happy_number(n, results)
  digits = n.to_s.split('')
  result = 0
  digits.each { |given_digit| result += given_digit.to_i * given_digit.to_i }
  if result == 1
    return true
  elsif results.key?(result) == false
    results[result] = true
    find_happy_number(result, results)
  elsif results.key?(result) == true
    return false
  end
end

pp(find_happy_number(313, {}))

# A happy number is a number defined by the following process:

# Starting with any positive integer, replace the number by the sum of the squares of its digits.
# Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
# Those numbers for which this process ends in 1 are happy.
# Return true if n is a happy number, and false if not.

# 528 -> 93 -> 90 -> 81 -> 65 -> 61 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 -> 16 -> 37 -> 58 -> ...
      
def find_happy_number(n, results)
    digits = n.to_s.split('')
    result = 0
    digits.each { |given_digit| result += given_digit.to_i * given_digit.to_i }
    if result == 1
      return true
    elsif results.key?(result) == false
      results[result] = true
      find_happy_number(result, results)
    elsif results.key?(result) == true
      return false
    end
  end
  
  def floyd_s_cycle_detection_algorithm_smarter(n)
      hare = tortoise = n
      while tortoise != hare {
      hare = next_number(next_number(hare))
      tortoise = next_number(tortoise)
    }
    return hare == 1
  end
  
  def get_digits(n)
    digits = []
    #528
    while n > 0 {
      digit = n % 10 # 8
      n = n / 10
      digits.shift(digit)
    }
  end
    
    
  def next_number(n)
      digits = n.to_s.split('')
    result = 0
    digits.each { |given_digit| result += given_digit.to_i * given_digit.to_i }
    return result
  end