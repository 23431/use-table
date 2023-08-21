import serve from "rollup-plugin-serve";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'demo/index.tsx',
  output: {
    name: 'index',
    file: 'lib/index.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({}),
    serve({ 
      open: true, // 是否打开浏览器
      contentBase: "./", // 入口 html 文件位置
      historyApiFallback: true, // 设置为 true 返回 index.html 而不是 404
      host: "localhost", // 
      port: 8000 // 端口号
    }),
  ]
}