const decodeName = (text) =>
  text.replace(/[\da-f]{2}/g, (code) =>
    String.fromCodePoint(Number.parseInt(code, 16)),
  )

const encodeName = (name) =>
  name.replace(/[\dA-Za-f]/g, (character) =>
    character.codePointAt(0).toString(16).padStart(2, '0'),
  )

function decode(text) {
  const array = text.split(/([A-Z]{3})/).slice(1)

  const names = new Map()
  for (let index = 0; index < array.length; index += 2) {
    const code = array[index]
    const name = decodeName(array[index + 1])
    names.set(code, name)
  }

  return names
}

function encode(currencies) {
  return currencies.map(({code, name}) => `${code}${encodeName(name)}`).join('')
}

export {encode, decode}
