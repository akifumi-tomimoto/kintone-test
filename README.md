# kintone-test
- テスト用のリポジトリですがメモ書きで色々書いていきます

## リポジトリ構成
```
.
├── .github/
│   ├── workflows/
│   │   └── upload-action.yml           リポジトリpush時のgithub actions設定を記述
│   └── pull_request_template.md        Pull Request作成時の初期テンプレートを記述
├── kintone-env/                        環境（スペース）で異なるkintoneの内部値などを定義 webpack生成時に環境ごとのファイルを参照する仕組みとする
│   ├── dev_env_var.js                  開発環境スペースに合わせたkintoneアプリIDなどを定義
│   ├── prd_env_var.js                  本番環境スペースに合わせたkintoneアプリIDなどを定義
│   └── stg_env_var.js                  検証環境スペースに合わせたkintoneアプリIDなどを定義
├── src/
│   ├── apps/                           javascript, cssでの開発が必要なkintoneアプリについて、必要なファイルを定義します
│   │   ├── app1/                       ディレクトリ名はアプリが特定できるような名称で定義すること
│   │   │   ├── index.js                kintoneアプリ単位のjavascript制御を記述
│   │   │   └── customize-manifest.json kintoneカスタマイズのCSSやJavaScriptファイルをkintoneへ適用できるcustomize-uploaderの設定を記述
│   │   └── app2/
│   │       ├── index.js
│   │       └── customize-manifest.json
│   └── common/
│       └── common.js                   全アプリ共通で利用する処理がある場合はこちらで管理する（各index.jsではimportで利用する）
├── .gitignore                          ここに記述されたファイルパターンやディレクトリはgitのトラッキング対象外になります（例）buildされたdistディレクトリやnode_modulesはトラッキングの必要がないので除外
├── README.md                           リポジトリの利用方法について記載
├── package-lock.json
├── package.json                        Node.jsプロジェクトにおける依存関係管理やスクリプトの定義に必要なファイルです。npm install時に参照されます
├── uploader.js                         対象アプリへjavascript, cssのファイルアップロードを行います
└── vite.config.js                      Viteの設定を記述
```

## 事前準備
### githubアカウントの作成
- 各プロジェクトの発行手順に準拠

### 開発ツールのインストール
- [Visual Studio Code](https://code.visualstudio.com/)

### git cloneの実行
- ローカルPCのディレクトリに`C:\git-project`のようなディレクトリを作成し、Visual Studio Codeから作成したディレクトリ（フォルダ）を開く
- `git clone https://github.com/akifumi-tomimoto/kintone-test.git`コマンドをVisual Studio Codeのターミナルから実行する
- ローカル環境にdevelopブランチの内容が展開される
- npm installを行っておく

## 開発の流れ
### 前提条件
- kintoneのドメイン単位で1顧客となる想定

### 開発手順
- 要件に従って、kintoneアプリ単位の機能開発を行う
- src/apps/{アプリ英名}配下にindex.jsとしてjavascriptファイルを用意し、対象アプリを制御する処理を記述していく
- 共通的な処理はsrc/apps/commonに記述（前述のindex.jsにimportして利用できる）
- 動作確認を行う際は、Viteでまとめたファイルのパスをローカル開発動作確認用のアプリの「URL指定で追加」に指定する
  - Viteを用いたファイルバンドルは後述

### ローカル環境のファイルをkintoneから参照できるように設定
- kintoneカスタマイズはURLでのJavaScriptファイルの登録ができます。  
この設定を使って自分の開発環境のURL（localhost）を登録します。  
そのままではlocalhostはサーバーではないので、JavaScript/CSSファイルを配信するのにLiveServerの機能を使います。
- [詳細はここを参照](https://cybozu.dev/ja/kintone/tips/development/customize/development-know-how/use-visual-studio-code-live-server-extension/)
- kintone側はローカル環境動作確認用のスペース・アプリに対して、localhostのファイル（cloneで取得したファイルやローカルで追加・更新したファイル）を参照するよう指定しておく  
※Live Serverの設定を有効にしていないと参照できないので注意
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/b6acb83c-7d6f-4610-a11d-b036a27c6ffa)

### Viteを用いたファイルバンドル
- Visual Studio Codeのターミナルから`npm run dev`コマンドを実行するとdist配下にバンドルされたファイルが出力される（ファイル名はappのディレクトリ名準拠）
- Visual Studio CodeでLiveServerを起動し、出力されたファイルパスをローカル開発動作確認用アプリの「URL指定で追加」に指定する
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/f35266e1-3262-4b5f-ab82-231f1d0507b0)
- 指定後、アプリで動作確認を行う

#### 環境（スペース）ごとの環境変数利用について
- kintone開発を進めるにあたって、役割は同じでも開発環境の違いからアプリIDが異なるケースについて、環境に応じたアプリIDを自動的に管理できるような仕組みとしたい
- .envファイルを環境ごとの定義ファイルとして用意し、Viteのファイルバンドル時にenvを指定することで環境に応じたアプリID定義がimportされるようにする
- 以下画像のように、各アプリのindex.jsに`import.meta.env.{環境変数KEY}`と記述することで環境に応じた定義が参照可能となる  
ローカル開発時の`.env.local`ファイルの内容をimportしたい場合は`npm run dev`で対象ファイルが参照される 
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/ca352ffd-d73f-4be3-b594-cb99a441e800)


### customize-uploaderによる自動デプロイ
- src/apps/{アプリ英名}配下に以下のような形式の`customize-manifest.json`を用意する
```json
{
  "app": "335",                このapp_idが参照されて対象アプリへアップロードされる
  "scope": "ALL",
  "desktop": {                 「JavaScript/CSSでカスタマイズ」の「PC用のJavaScript/CSS」で指定したいファイルパスを記述
    "js": ["dist/app1.js"],
    "css": []
  },
  "mobile": {                  「JavaScript/CSSでカスタマイズ」の「スマートフォン用のJavaScript」として対象パスのファイルをアップロードする
    "js": []
  }
}
```

## 検証環境へのデプロイフロー
- Github Pagesの利用を検討。  
以下画像のような設定でGithub Pagesからファイルをホストティングできるようにする  
画像はmainブランチを設定しているが、stagingブランチ（検証環境用ブランチ）を指定したほうが良い
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/eb5b4dc2-e57d-4a52-8758-ecb4f51e7a3f)

- デプロイされたURL上のファイルを検証環境動作確認用のスペース・アプリで指定できる
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/e252a076-36fd-42b0-8aa5-6e7e0e14ebf1)

## 本番環境へのデプロイフロー
### 事前準備
- packagage.jsonのconfig.baseurlにkintoneのドメインを追加
- secretsにENV_USER_NAMEとENV_USER_PASSWORDを定義する（対象アプリへのファイルアップロードにkintoneアカウントとパスワードが必要）
### デプロイフロー定義
- upload-action.ymlに定義
- mainブランチへのpushでjobsが実行
- 具体的な処理としてはsrc/apps配下のファイルをwebpackし、uploader.jsが実行される
```
name: upload-action
on: 
  push:
    branches:
      - main
jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: | 
          npm install
          npm run prd
          npm run upload --username=${{ secrets.ENV_USER_NAME }} --password=${{ secrets.ENV_USER_PASSWORD }}
```

### uploader.jsの説明（CopilotChatで生成）
このJavaScriptコードは、kintone-customize-uploaderを使用して、特定のパターンにマッチするファイルをアップロードするスクリプトです。  
以下はコードのステップバイステップの説明です：

1. child_processモジュールからexecSync関数をインポートします。
この関数は、Node.jsの子プロセスを同期的に実行するために使用されます。
2. globモジュールからglob関数をインポートします。この関数は、ファイルパスのパターンにマッチするファイルを検索するために使用されます。
3. command変数を定義し、npx kintone-customize-uploaderコマンドにコマンドライン引数から取得したbase-url、username、passwordを追加しています。これは、kintoneのカスタマイズファイルをアップロードするためのコマンドです。
4. entries変数に、glob.sync関数を使用してsrc/apps/**/customize-manifest.jsonにマッチするファイルのリストを代入します。このパターンは、src/apps/ディレクトリとそのサブディレクトリ内のcustomize-manifest.jsonファイルを対象としています。
5. entries配列の各ファイルに対して、以下の処理を行うforEachループを実行します：
   - アップロード中であることを示すメッセージとファイル名をコンソールに出力します。
   - execSync関数を使用して、command変数にファイルパスを追加したコマンドを実行します。これにより、指定されたファイルがkintoneにアップロードされます。
   - コマンドの実行結果をコンソールに出力します。

このスクリプトは、kintoneのカスタマイズファイルをバッチでアップロードするために使用され、コマンドラインから実行されることを想定しています。
コマンドライン引数を通じて、アップロード先のURL、ユーザー名、パスワードを指定します。

