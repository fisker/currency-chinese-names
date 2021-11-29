import {terser} from 'rollup-plugin-terser'

const minifyPlugins = [terser()]

const moduleName = 'currencyChineseNames'

function createBuild({format, minify = false, extension, entry}) {
  const filename = `${entry}${minify ? '.min' : ''}.${extension}`

  return {
    input: `src/${entry}.js`,
    output: [
      {
        file: `dist/${filename}`,
        format,
        name: moduleName,
        sourcemap: true,
      },
    ],
    plugins: minify ? minifyPlugins : [],
  }
}

export default ['index'].flatMap((entry) =>
  [
    {format: 'umd', extension: 'js'},
    {format: 'umd', minify: true, extension: 'js'},
    {format: 'esm', extension: 'mjs'},
    {format: 'esm', minify: true, extension: 'mjs'},
    {format: 'cjs', extension: 'cjs'},
  ].map((options) => createBuild({...options, entry})),
)
