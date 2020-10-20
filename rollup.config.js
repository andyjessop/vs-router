import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/router/create-router.ts',
  output: {
    file: 'dist/router.min.js',
    format: 'esm'
  },
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' }),
    terser(),
  ],
};
