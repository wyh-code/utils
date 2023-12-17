const { babel } = require('@rollup/plugin-babel');

export default {
  input: './src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es'
  },
  plugins: [
    babel({
      "presets": ['@babel/preset-env'],
    }),
  ],
};