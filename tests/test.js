import test from 'ava'
import getData from '../scripts/get-data.js'
import * as current from '../src/index.js'
import * as all from '../src/all.js'

const isUnique = (array) =>
  array.every((element, index) => array.indexOf(element) === index)

test('currencies', (t) => {
  t.true(Array.isArray(current.currencies))
  t.true(Array.isArray(all.currencies))

  t.true(isUnique(current.currencies.map(({code}) => code)))
  t.true(isUnique(all.currencies.map(({code}) => code)))
})

test('getCurrencyName', (t) => {
  t.is(current.getCurrencyName('CNY'), '人民币元')
  t.is(current.getCurrencyName('SUR'), undefined)
  t.is(all.getCurrencyName('CNY'), '人民币元')
  t.is(all.getCurrencyName('SUR'), '苏联卢布')
})

test('data should be updated', async (t) => {
  const data = await getData()
  t.is(data.current.length, 177)
  t.is(data.outdated.length, 108)
  t.deepEqual(data.current, current.currencies)
  t.deepEqual([...data.current, ...data.outdated], all.currencies)
})
