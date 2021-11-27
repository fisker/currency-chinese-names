import {all as rawData} from './raw-currency-data.js'
import {decodeRawData, createGetCurrencyFunction} from './utils.js'

export const currencies = decodeRawData(rawData)
export const getCurrencyName = createGetCurrencyFunction(currencies)
