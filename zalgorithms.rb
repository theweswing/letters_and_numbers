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
