import test from 'ava'
import getData from '../scripts/get-data.js'
import names from '../src/index.js'

const isUnique = (array) =>
  array.every((element, index) => array.indexOf(element) === index)
const toArray = (names) =>
  [...names.entries()].map(([code, name]) => ({code, name}))

test('currencies', (t) => {
  t.true(names instanceof Map)
  t.is(names.get('CNY'), '人民币元')
  t.is(names.get('NON-EXISTS'), undefined)
})

test('data should be updated', async (t) => {
  const data = await getData()
  t.is(data.length, 177)
  t.true(isUnique(data.map(({code}) => code)))
  t.deepEqual(toArray(names), data)
})
