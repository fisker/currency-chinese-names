const decodeName = (text) =>
  text.replace(/[\da-f]{2}/g, (code) =>
    String.fromCodePoint(Number.parseInt(code, 16)),
  )

const encodeName = (name) =>
  name.replace(/[\dA-Za-f]/g, (character) =>
    character.codePointAt(0).toString(16).padStart(2, '0'),
  )

function decode(text) {
  return new Map(
    text
      .match(/[A-Z]{3}[^A-Z]+/g)
      .map((text) => [text.slice(0, 3), decodeName(text.slice(3))]),
  )
}

function encode(currencies) {
  return currencies.map(({code, name}) => `${code}${encodeName(name)}`).join('')
}

export {encode, decode}
