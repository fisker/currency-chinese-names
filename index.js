import rawData from './currencies-raw.js'

function parseRawData(text) {
  return Object.fromEntries(
    text.split(',').map((string) => [string.slice(0, 3), string.slice(3)]),
  )
}

const currencies = new Map()
function getCurrencyName(currency, includeOutdated = true) {
  const storeKey = includeOutdated ? 'all' : 'current'

  if (!currencies.has(storeKey)) {
    const text = includeOutdated ? rawData.join(',') : rawData[0]
    currencies.set(storeKey, parseRawData(text))
  }

  return currencies.get(storeKey)[currency]
}
export {getCurrencyName}
