import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

// export default {
//   // input: ['src/index_wx.ts'],
//   input: 'src/index.tsx',
//   output: {
//     name: 'canvasPoster',
//     // dir: 'lib',
//     file: 'lib/index.js',
//     format: 'umd',
//     inlineDynamicImports: true,
//     sourcemap: true
//   },
//   external: [
//     'react',
//     'react-dom',
//   ],
//   plugins: [
//     resolve(),
//     commonjs(),
//     typescript({
//       useTsconfigDeclarationDir: true,
//     }),
//   ]
// }

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