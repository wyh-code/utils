const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser')
const clear = require('rollup-plugin-clear');
const { babel } = require('@rollup/plugin-babel');

export default {
  input: './src/index.ts',
  output: [
    {
      dir: 'lib',
      format: 'cjs',
      entryFileNames: '[name].cjs.js',
      sourcemap: false, // 是否输出sourcemap
    },
    {
      dir: 'lib',
      format: 'esm',
      entryFileNames: '[name].esm.js',
      sourcemap: false, // 是否输出sourcemap
    },
    {
      dir: 'lib',
      format: 'iife',
      entryFileNames: '[name].iife.js',
      name: 'ostore_utils',
      sourcemap: false, // 是否输出sourcemap
    },
    {
      dir: 'lib',
      format: 'umd',
      entryFileNames: '[name].umd.js',
      name: 'ostore_utils', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  plugins: [
    babel({
      "presets": ['@babel/preset-env'],
    }),
    resolve(),
    commonjs(),
    clear({
      targets: ['./lib'],
    }),
    typescript({ module: 'ESNext' }),
  ],
};