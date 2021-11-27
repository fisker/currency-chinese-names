import {all as rawData} from './raw-currency-data.js'
import {decode} from './utils.js'

const names = decode(rawData)
export {names}
