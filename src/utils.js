const decodeName = (text) =>
  text.replace(/[\da-f]{2}/g, (code) =>
    String.fromCodePoint(Number.parseInt(code, 16)),
  )

const encodeName = (name) =>
  name.replace(/[\dA-Za-f]/g, (character) =>
    character.codePointAt(0).toString(16).padStart(2, '0'),
  )

function decodeRawData(text) {
  const array = text.split(/([A-Z]{3})/).slice(1)

  const currencies = []
  for (let index = 0; index < array.length; index += 2) {
    const code = array[index]
    const name = decodeName(array[index + 1])
    currencies.push({name, code})
  }

  return currencies
}

function encodeData(currencies) {
  return currencies.map(({code, name}) => `${code}${encodeName(name)}`).join('')
}

const toMap = (currencies) =>
  new Map(currencies.map(({name, code}) => [code, name]))

const createGetCurrencyFunction = (currencies) => {
  currencies = toMap(currencies)
  return (currency) => currencies.get(currency)
}

export {decodeRawData, encodeData, createGetCurrencyFunction}
