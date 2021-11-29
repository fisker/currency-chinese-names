import raw from './raw-currency-data.js'

export default new Map(
  raw.split(',').map((text) => [text.slice(0, 3), text.slice(3)]),
)
