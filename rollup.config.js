import {terser} from 'rollup-plugin-terser'

const minifyPlugins = [terser()]

const moduleName = 'currency'

function createBuild({format, minify = false, extension}) {
  const filename = `index${minify ? '.min' : ''}.${extension}`

  return {
    input: 'index.js',
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

export default [
  {format: 'umd', extension: 'js'},
  {format: 'umd', minify: true, extension: 'js'},
  {format: 'esm', extension: 'mjs'},
  {format: 'esm', minify: true, extension: 'mjs'},
  {format: 'cjs', extension: 'cjs'},
].map((options) => createBuild(options))
