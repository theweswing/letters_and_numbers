require 'date'

bday = Date.new(1991, 10, 17)

# pp(bday)

# pp(bday + 1)

# pp(bday == Date.parse('1991-10-17'))

require 'net/http'
require 'json'

url = 'https://api.dictionaryapi.dev/api/v2/entries/en/yoloz'
uri = URI(url)
response = Net::HTTP.get(uri)
pp(JSON.parse(response)[0]['word'])
