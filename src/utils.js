const decodeName = (text) =>
  text.replace(/[\da-f]{2}/g, (code) =>
    String.fromCodePoint(Number.parseInt(code, 16)),
  )

const LOWERCASE_A_CODEPOINT = 'a'.codePointAt(0)
const UPPERCASE_A_CODEPOINT = 'A'.codePointAt(0)
const charactersNeedEncode = new Map(
  [
    // 0-9
    ...Array.from({length: 10}, (_, index) => String(index)),
    // a-f
    ...Array.from({length: 6}, (_, index) =>
      String.fromCodePoint(index + LOWERCASE_A_CODEPOINT),
    ),
    // A-Z
    ...Array.from({length: 26}, (_, index) =>
      String.fromCodePoint(index + UPPERCASE_A_CODEPOINT),
    ),
  ].map((character) => [
    character,
    character.codePointAt(0).toString(16).padStart(2, '0'),
  ]),
)

const encodeName = (name) =>
  [...name]
    .map((character) =>
      charactersNeedEncode.has(character)
        ? charactersNeedEncode.get(character)
        : character,
    )
    .join('')

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

const encodeData = (currencies) =>
  currencies.map(({code, name}) => `${code}${encodeName(name)}`).join('')

const toMap = (currencies) =>
  new Map(currencies.map(({name, code}) => [code, name]))

const createGetCurrencyFunction = (currencies) => {
  currencies = toMap(currencies)
  return (currency) => currencies.get(currency)
}

export {decodeRawData, encodeData, createGetCurrencyFunction}
