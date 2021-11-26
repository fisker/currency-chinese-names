# chinese-currency

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/chinese-currency/CI/main?style=flat-square
[github_actions_link]: https://github.com/fisker/chinese-currency/actions?query=branch%3Amain
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/chinese-currency/main?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/chinese-currency?branch=main
[license_badge]: https://img.shields.io/npm/l/prettier-format.svg?style=flat-square
[license_link]: https://github.com/fisker/chinese-currency/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/chinese-currency.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/chinese-currency

> 货币中文信息

## 安装

```bash
yarn add chinese-currency
```

## 使用

```js
import {getCurrencyName} from 'chinese-currency'

console.log(getCurrencyName('CNY'))
//=> 人民币元
```

## API

### `getCurrencyName(currency, options?)`

[TBD]
