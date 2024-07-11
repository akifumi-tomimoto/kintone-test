# kintone-test
- テスト用のリポジトリですがメモ書きで色々書いていきます

## リポジトリ構成
```
.
├── .github/
│   ├── workflows/
│   │   ├── upload-action-prd.yml           production環境のgithub actions設定を記述
│   │   └── upload-action-stg.yml           staging環境のgithub actions設定を記述
│   └── pull_request_template.md            Pull Request作成時の初期テンプレートを記述
├── src/
│   ├── apps/                               javascript, cssでの開発が必要なkintoneアプリについて、必要なファイルを定義します
│   │   ├── app1/                           ディレクトリ名はアプリが特定できるような名称で定義すること
│   │   │   ├── index.js                    kintoneアプリ単位のjavascript制御を記述
│   │   │   ├── customize-manifest-prd.json kintoneカスタマイズのCSSやJavaScriptファイルをkintone本番環境へ適用するcustomize-uploaderの設定を記述
│   │   │   └── customize-manifest-stg.json kintoneカスタマイズのCSSやJavaScriptファイルをkintoneステージング環境へ適用するcustomize-uploaderの設定を記述
│   │   └── app2/
│   │       ├── index.js
│   │       ├── customize-manifest-prd.json
│   │       └── customize-manifest-stg.json
│   └── common/
│       └── common.js                   全アプリ共通で利用する処理がある場合はこちらで管理する（各index.jsではimportで利用する）
├── .env.production                     production環境変数について定義 Viteで利用する場合はプレフィックスに`VITE_`を指定して登録する
├── .env.staging                        staging環境変数について定義 Viteで利用する場合はプレフィックスに`VITE_`を指定して登録する
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
ローカル開発時の`.env.local`ファイルの内容をimportしたい場合は`npm run dev`で対象ファイルが参照される ※.env.localファイルはローカルで開発者が作成すること
![image](https://github.com/akifumi-tomimoto/kintone-test/assets/60957697/96976616-c08a-43c9-879a-1391abe9989d)



### customize-uploaderによる一括アップロード
- src/apps/{アプリ英名}配下に以下のような形式の`customize-manifest-{env}.json`を用意する
- envの値によってuploader.jsでアップロード対象を参照するjsonファイルが切り替えられる
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

## ステージング・本番環境へのデプロイフロー
### 事前準備
- packagage.jsonのconfig.baseurlにkintoneのドメインを追加
- secretsにENV_USER_NAMEとENV_USER_PASSWORDを定義する（対象アプリへのファイルアップロードにkintoneアカウントとパスワードが必要）
### デプロイフロー定義
- upload-action-{env}.ymlに定義
- Github Actionsの`Run Workflow`から環境に応じたアクションを選択し実行
- 具体的な処理としてはsrc/apps配下のファイルをViteを用いてバンドルし、uploader.jsから対象アプリへアップロードする
```
name: upload-action
on:
  workflow_dispatch:

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
          npm run upload --username=${{ secrets.ENV_USER_NAME }} --password=${{ secrets.ENV_USER_PASSWORD }} prd
```
