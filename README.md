# kintone-test
- テスト用のリポジトリですがメモ書きで色々書いていきます

## 事前準備
### githubアカウントの作成
- WIP...

### 開発ツールのインストール
- [Visual Studio Code](https://code.visualstudio.com/)

### git cloneの実行
- ローカルPCのディレクトリに`C:\git-project`のようなディレクトリを作成し、Visual Studio Codeから作成したディレクトリ（フォルダ）を開く
- `git clone -b develop https://github.com/akifumi-tomimoto/kintone-test.git`コマンドをVisual Studio CodeのTERMINALから実行する
- ローカル環境にdevelopブランチの内容が展開される

### ローカル環境のファイルをkintoneから参照できるように設定
- kintoneカスタマイズはURLでのJavaScriptファイルの登録ができます。  
この設定を使って自分の開発環境のURL（localhost）を登録します。  
そのままではlocalhostはサーバーではないので、JavaScript/CSSファイルを配信するのにLiveServerの機能を使います。
- [詳細はここを参照](https://cybozu.dev/ja/kintone/tips/development/customize/development-know-how/use-visual-studio-code-live-server-extension/)
- kintone側はローカル環境動作確認用のスペース・アプリに対して、localhostのファイル（cloneで取得したファイルやローカルで追加・更新したファイル）を参照するよう指定しておく  
※Live Serverの設定を有効にしていないと参照できないので注意
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/b6acb83c-7d6f-4610-a11d-b036a27c6ffa)


## 検証環境へのデプロイフロー
- Github Pagesの利用を検討。  
以下画像のような設定でGithub Pagesからファイルをホストティングできるようにする  
画像はmainブランチを設定しているが、stagingブランチ（検証環境用ブランチ）を指定したほうが良い
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/eb5b4dc2-e57d-4a52-8758-ecb4f51e7a3f)

- デプロイされたURL上のファイルを検証環境動作確認用のスペース・アプリで指定できる
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/e252a076-36fd-42b0-8aa5-6e7e0e14ebf1)

## 本番環境へのデプロイフロー
- 坂野さんからサンプルを共有いただいたので参考に
- https://github.com/tbanno-asnet/kintone-customize-feasibility

