# packemonでフロントエンドでもバックエンドでも使えるライブラリをゲットだぜ

## まえがき

最近、フロントエンドとバックエンドをモノレポで一括管理するのにはまっております。
その際、共通化されたモジュールや型定義ファイルを作成する必要がありました。
型定義についてはzodを使用しているため、少々ロジックや他のライブラリが絡みます。
フロントエンドでもバックエンドでも使えるようにするため、デュアルパッケージを作成する必要がありました。

フロントエンドはvite + React
バックエンドはnode.jsでExpressなどを使用することを想定しています。
このとき、フロントエンドはESMで、バックエンドはCommonJSで動作する必要があります。
単純にビルドをしているとうまく通らなかったり、通るけれどもVSCodeの補完が効かなかったりします。

そういうわけで、デュアルパッケージを作成するためにpackemonを使用することにしました。

### packemonをdevDependenciesに追加する

```bash
npm install -d packemon
```

### package.jsonにpackemonに関する設定を追加する

以下、```npm init -y```を行っただけの最低限の構成です。
適宜、必要な設定を追加してください。

```json:package.json
{
  "name": "lib",
  "version": "1.0.0",
  "description": "",
  "main": "src/main.ts",
  "scripts": {
    "build": "packemon build --addEngines --addExports --declaration"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "packemon": "^3.2.1"
  },
  "packemon": {
    "platform": [
      "node",
      "browser"
    ],
    "support": "stable",
    "format": [
      "lib",
      "esm"
    ],
    "inputs": {
      "index": "src/main.ts"
    }
  }
}
```

prettierやeslintなど必要なものは適宜追加してください。
inputsについては、僕が```src/main.ts```という名前で開発する派なので、そうなっています。
デフォルトはsrc/index.tsで開発することになっているので、そのときはinputsの項目は不要です。

### tsconfig.lib.jsonとtsconfig.esm.jsonを用意する

普通のtsconfigは各自好きなものを用意しておいてください。

```json:tsconfig.lib.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist/types",
    "noEmit": false,
    "outDir": "./dist/lib",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ]
}
```

```json:tsconfig.esm.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "outDir": "./dist/esm",
    "declaration": true,
    "declarationDir": "./dist/types",
    "rootDir": "./src",
    "noEmit": false
  },
  "include": [
    "src/**/*"
  ]
}
```

### ビルドする

```bash
npm run build
```

これで、```lib```と```esm```にファイルが生成されます。

あとはモノレポ化したフロントエンドとバックエンドでそれぞれ```npm install```して使えばOKです。
