import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

// import baseConfig from "./rollup.config.base";

// // export default {
// //   ...baseConfig,
// //   plugins: [...baseConfig.plugins, terser(), filesize()],
// // };

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'index',
      file: 'lib/index.js',
      format: 'es',
      inlineDynamicImports: true,
      sourcemap: true
    },
    external: [
      'react',
      'react-dom',
      'antd'
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ]
  }
]