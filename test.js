import test from 'ava'
import getData from './scripts/get-data.js'
import {currencies, getCurrencyName} from './index.js'

const isUnique = (array) =>
  array.every((element, index) => array.indexOf(element) === index)

test('currencies', (t) => {
  t.true(Array.isArray(currencies.current))
  t.true(Array.isArray(currencies.outdated))

  t.true(
    isUnique(
      [...currencies.current, ...currencies.outdated].map(({code}) => code),
    ),
  )
})

test('getCurrencyName', (t) => {
  t.is(getCurrencyName('CNY'), '人民币元')
  t.is(getCurrencyName('SUR'), '苏联卢布')
  t.is(getCurrencyName('CNY', /* includeOutdated */ false), '人民币元')
  t.is(getCurrencyName('SUR', /* includeOutdated */ false), undefined)
})

test('data should be updated', async (t) => {
  const {current, outdated} = await getData()
  t.deepEqual(current, currencies.current)
  t.deepEqual(outdated, currencies.outdated)
  t.is(current.length, 177)
  t.is(outdated.length, 108)
})
