import rawData from './raw-currency-data.js'

const decodeName = (text) =>
  text.replace(/[\da-f]{2}/g, (code) =>
    String.fromCodePoint(Number.parseInt(code, 16)),
  )

function parseRawData(text) {
  const array = text.split(/([A-Z]{3})/).slice(1)

  const currencies = []
  for (let index = 0; index < array.length; index += 2) {
    const code = array[index]
    const name = decodeName(array[index + 1])
    currencies.push({name, code})
  }

  return currencies
}

const current = parseRawData(rawData[0])
const outdated = parseRawData(rawData[1])

const currencies = {
  current,
  outdated,
  all: [...current, outdated],
}

Object.fromEntries(
  Object.entries(rawData).map(([type, text]) => [type, parseRawData(text)]),
)

const currencyData = new Map(
  Object.entries(currencies).map(([type, currencies]) => [
    type,
    new Map(currencies.map(({name, code}) => [code, name])),
  ]),
)

function getCurrencyName(currency, includeOutdated = true) {
  return currencyData.get(includeOutdated ? 'all' : 'current').get(currency)
}
export {currencies, getCurrencyName}
