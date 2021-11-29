/*
"GB/T 12406-2008 表示货币和资金的代码" 完整版可以在以下网站查看到, 但是由PDF转换的图片格式
http://www.bz360.org:8018/ESA_Query_STD/Details.aspx?a100=GB%2012406-2008
*/
import process from 'node:process'
import fetch from 'node-fetch'
import HttpsProxyAgent from 'https-proxy-agent'

const proxy =
  process.env.ALL_PROXY || process.env.HTTPS_PROXY || process.env.HTTP_PROXY
function* parseCurrencyTable(table) {
  for (const text of table.split('</tr>')) {
    const matches = [...text.matchAll(/(?:<td>(.*?)<\/td>)+/g)].map(
      ([, text]) => text,
    )
    const [code] = matches
    if (!code) {
      continue
    }
    const name = matches[3]
      .replace(/<sup[^<>]*>.*?<\/sup>/g, '')
      .replace(/<.*?>/g, '')
      .replace(/\[注 \d+]/, '')
      .trim()

    yield {code, name}
  }
}

function getCurrentCodes(text) {
  const table = text
    .split('id="现行代码"')[1]
    .split('<table')[1]
    .split('<tbody')[1]
    .split('</table>')[0]

  return [...parseCurrencyTable(table)]
}

async function getData() {
  const agent = proxy ? new HttpsProxyAgent(proxy) : undefined

  const response = await fetch('https://zh.m.wikipedia.org/wiki/ISO_4217', {
    agent,
  })
  const text = await response.text()

  return getCurrentCodes(text)
}

export default getData
