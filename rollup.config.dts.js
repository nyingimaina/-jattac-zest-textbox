import dts from 'rollup-plugin-dts';

export default {
  input: './UI/index.ts',
  output: [{ file: 'dist/index.d.ts', format: 'es' }],
  plugins: [dts()],
};
