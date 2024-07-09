// vite.config.js
import { resolve, dirname } from 'path'
import { defineConfig } from 'vite'

const glob = require('glob');

const basePath = resolve('src', 'apps');
const environment = process.env.NODE_ENV || 'dev';

// basePath配下の各ディレクトリを複数のentryとする
const entries = glob.sync('**/index.+(js|ts|tsx)', {cwd: basePath}).reduce(
  (prev, file) => ({
    ...prev,
    [dirname(file)]: resolve(basePath, file),
  }),
  {}
);

export default defineConfig({
  build: {
    lib: {
      // 複数のエントリーポイントのディクショナリや配列にもできます
      entry: entries,
      name: 'MyLib',
      // 適切な拡張子が追加されます
      fileName: '[name]'
    },
    rollupOptions: {
      // ライブラリーにバンドルされるべきではない依存関係を
      // 外部化するようにします
      external: ['vue'],
      output: {
        // 外部化された依存関係のために UMD のビルドで使用する
        // グローバル変数を提供します
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})