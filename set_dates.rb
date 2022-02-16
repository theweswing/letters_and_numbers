require 'date'

bday = Date.new(1991, 10, 17)

pp(bday)

pp(bday + 1)

pp(bday == Date.parse('1991-10-17'))
