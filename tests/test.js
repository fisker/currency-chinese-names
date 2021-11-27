import test from 'ava'
import getData from '../scripts/get-data.js'
import {names as current} from '../src/index.js'
import {names as all} from '../src/all.js'

const isUnique = (array) =>
  array.every((element, index) => array.indexOf(element) === index)
const toArray = (names) =>
  [...names.entries()].map(([code, name]) => ({code, name}))

test('currencies', (t) => {
  t.true(current instanceof Map)
  t.true(all instanceof Map)
})

test('getCurrencyName', (t) => {
  t.is(current.get('CNY'), '人民币元')
  t.is(current.get('SUR'), undefined)
  t.is(all.get('CNY'), '人民币元')
  t.is(all.get('SUR'), '苏联卢布')
})

test('data should be updated', async (t) => {
  const data = await getData()
  t.is(data.current.length, 177)
  t.is(data.outdated.length, 108)
  t.true(isUnique(data.current.map(({code}) => code)))
  t.true(isUnique(data.outdated.map(({code}) => code)))

  t.deepEqual(toArray(current), data.current)
  t.deepEqual(toArray(all), [...data.current, ...data.outdated])
})
