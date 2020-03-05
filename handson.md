# フロントエンド開発環境を作成しよう
このパートではフロントエンドアプリケーションの開発環境を作成します。Node.js環境がある前提で進めますので、まだ環境構築が終わっていない方は前章を参考にしてください。

[0-2 開発を進める上で必要なツール（Mac）](0-2 開発を進める上で必要なツール（Mac）.md)

## 本パートの目標物
本パートでは、Reactで書いたコンポーネントをbabel+Webpackでビルドしてブラウザで表示できることを確認するところまでやっていきます。

![Hello react.](./helloreact.png "Hello react")

## 目標物を作成するまでの流れ
1. 新規nodeアプリケーションの作成
1. Reactアプリケーションの作成
1. babelとWebpackを使ったビルド環境の構築
1. htmlファイルを作成して動作確認

## 新規nodeアプリケーションの作成
これから作るアプリケーションのディレクトリ（フォルダ）を新規作成します。ディレクトリはどこに作成しても構いません。ここではホームディレクトリ直下にyoutubeviewerという名前で作成します。

```shell script
$ mkdir ~/youtubeviewer
```

「mkdir」はディレクトリを作成するコマンドです。「~」はユーザディレクトリを示すエイリアスです。上記のコマンドで「youtubeviewer」というディレクトリがユーザーディレクトリ直下に作成されました。「cd」コマンドを使って移動したいディレクトリに移動します。

【例】

```shell script
$ cd 移動したいディレクトリ名
```

「cd」コマンドはchange directory（ディレクトリを移動する）の略です。今回は先ほど作成したyoutubeviewerというディレクトリに移動したいので下記のコマンドを実行します。

```shell script
$ cd ~/youtubeviewer
```

ディレクトリが移動できたことを、「pwd」コマンドを使って確認します。「pwd」は現在いるディレクトリ（ワーキングディレクトリ）を確認するコマンドです。

```shell script
$ pwd
/Users/ユーザー名/youtubeviewer
```

次に、このディレクトリをnodeアプリケーション開発ディレクトリとして初期化します。以下のコマンドを入力します。

```shell script
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (sandbox) 
```

ここでは対話形式で作成するアプリケーションの情報を聞かれます。全てデフォルトで良いので、全ての質問にエンターキーを押せばOKです。

```shell script
package name: (youtubeviewer)  # Enterを押す
version: (1.0.0)  # Enterを押す
description:  # Enterを押す
entry point: (index.js) # Enterを押す 
test command:  # Enterを押す
git repository:  # Enterを押す
keywords:  # Enterを押す
author:  # Enterを押す
license: (ISC)  # Enterを押す
About to write to /Users/fukudayasuo/src/github.com/Techpit-Market/React-component-YouTube/sandbox/package.json:

{
  "name": "youtubeviewer",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)  # Enterを押す
```

`youtubeviewer`ディレクトリに`package.json`というファイルができました。

## Reactアプリケーションの作成
以下のようにディレクトリを作成します

```
youtubeviewer
  └ sample
    └ src
```

`sample/src`に`sample.jsx`ファイルを作成し、以下内容を記述します。

```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <h1>Hello react.</h1>,
  rootEl,
);
```

以下の、
```js
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```
の部分の記述は、ブラウザで動くようにするために必要なパッケージを読み込むための記述です。

Reactのパッケージをインストールします。

```shell script
$ npm i react@^16.12.0 react-dom@^16.12.0 core-js@^3.6.4 regenerator-runtime@^0.13.3 
```

`npm`はnodeのパッケージマネージャで、`npm install パッケージ名` で外部パッケージを現在のアプリケーションにインストールできます。

(`npm i`は`npm install`のショートハンドです。)

これによって、`node_modules`ディレクトリが作成され、そこに`react`,`react-dom`パッケージがインストールされ、使用できるようになります。

## babelとWebpackを使ったビルド環境の構築

## babelのインストール
babelをインストールします。babelとはJavaScriptのトランスパイラで、Reactのjsx構文や、ES6で記述した内容を実行する環境(ここではブラウザ)で動くように変換するものです。

先ほど書いたjsxファイルのJavaScript実装は、babelを使ってブラウザで実行できるようトランスパイルすることでブラウザで実行できるようになります。

以下コマンドでbabelおよび関連パッケージをインストールします。

```shell script
$ npm i -D @babel/core@^7.8.3 @babel/register@^7.8.3 @babel/preset-env@^7.8.3 @babel/preset-react@^7.8.3 @babel/cli@^7.8.3 
```

(`npm i -D`は`npm install --save-dev`のショートハンドです。babelなどビルドで使用するツールはdevDependenciesにインストールします。)

また、この後の章で使用する`styled-component`のため設定もここで追加するため、以下のように`styled-component`もインストールします。

```shell script
$ npm i styled-component@^5.0.0
```

## babelの設定記述
アプリケーションディレクトリ直下に、`babel.config.js`を作成して、そこにbabelの設定を記述します。babelは決まったファイル名を設定ファイルとして読み込むため、必ず`babel.config.js`という名前でファイルを作成してください。

なお、babelの設定はjsonでも記述できますが、今回は環境に合わせてビルド設定を変更したいため、`js`ファイルで作成します。

babelの設定ファイルでは、かなり細かいところまで設定でき、全てを詳細に理解するのは大変です。babelを使った開発に慣れながら少しづつ理解していくことをお勧めします。

ここでは、設定ファイルをここで紹介する作成できればOKです。

では早速作っていきましょう。アプリケーションディレクトリ直下に`babel.config.js`を作成します。

以下のようにファイルを作成します。
```
youtubeviewer
  ~(中略)~
  └ babel.config.js
```

`babel.config.js`の中に以下を記述します。
```
module.exports = (api) => {
  const isProduction = api.env('production');
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '79',
          ie: '11',
          firefox: '72',
          safari: '13',
        },
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !isProduction,
      },
    ],
  ];

  const plugins = [];

  if (!isProduction) {
    plugins.push('babel-plugin-styled-components');
  }

  return {
    presets,
    plugins,
  };
};
```

使用するpresetsとpluginsを持つオブジェクトを生成して返すように設定ファイルを記述します。(`json`で設定ファイルを書く場合は、`babel.config.json`という名前でpluginsとpresetsを持つオブジェクトをJSONで記述します。)

babelの設定ファイルの詳細は、以下公式ドキュメントを参照してください。

参考）[Configure Babel](https://babeljs.io/docs/en/configuration)

簡単にですが、設定ファイルに書いてある内容を説明します。

`@babel/preset-env`というパッケージは、トランスパイルする時にどの環境で動かすようにトランスパイルするかを設定するものです。ここでは、Chromeのバージョン79,IEのバージョン11,FireFoxのバージョン72, Safariのバージョン13で動作するようにトランスパイルするようにオプションを設定しています。

`@babel/preset-env`のオプションに指定している、
```
  useBuiltIns: 'entry',
  corejs: 3,
```
の設定部分は、指定先の環境では対応していない機能について、どのように補完するかを設定しています。

例えばIE11では[Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)に対応していませんが、`Promise`を使って実装しても、トランスパイル後にはIE11で動作するようなコードに変換してくれます。


詳細な`@babel/preset-env`の設定方法は、以下を参照してください。

参考）[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)

`@babel/preset-react`というパッケージは、トランスパイルする時にReactのjsx構文をJavaScriptに変換してくれるものです。オプションで、開発環境時(`NODE_ENV=production`*ではない時*)に開発モードになるよう設定しています。開発モードでは、トランスパイル後のソースコードにChromeの開発者ツールなどからデバッグする時に使用するコンポーネントの情報が残ります。

詳細な`@babel/preset-react`の設定方法は、以下を参照してください。

参考）[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)

`babel-plugin-styled-components`は、先ほどインストールした`styled-components`をインストールすると一緒にインストールされるパッケージです。ここでも開発時には開発モードになるよう設定しています。

## Babelを使ってトランスパイルを実行
記述した設定ファイルを使って、先ほど記述した`sample.jsx`をトランスパイルできるか確認します。

以下コマンドを実行して、先ほど書いたsample.jsxをトランスパイルします。
```shell script
$ npx babel sample/src/sample.jsx -o sample/output.js
```

このコマンドで`sample/output.js`が作られます。作られなかった場合、設定ファイルが合っているかや、必要なパッケージがインストールされているかを確認してください。

作られた`sample/output.js`の中を確認してみましょう。

```js
"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

// ~中略~
var rootEl = document.getElementById('root');

var x =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (r) {
              return r;
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function x() {
    return _ref.apply(this, arguments);
  };
}();

_reactDom.default.render(_react.default.createElement("h1", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 13
  },
  __self: void 0
}, "Hello react.", x()), rootEl);

```

jsx記法で書いた`<h1>`という記述がなくなり、`_react.default.createElement("h1", {...` のような記述になっています。これでブラウザで解釈できるJavaScriptの記述になりました。

また、`require('core-js/...');`の記述は`babel.config.js`で設定したブラウザでES6の機能が動くようにするためのモジュールを読み込むための記述です。

なお、`babel.config.js`のブラウザ指定箇所を変えて、以下のようにして`chrome: '79'`だけにしてみましょう。

```shell script
    targets: {
      chrome: '79',
    },
```

上記のように`babel.config.js`を編集してから再度トランスパイルすると、また違う結果になります。

`require('core-js/...');`の記述が減りました。これはChromeではES6の機能がすでに動作するため、IE11をターゲットにした場合と比べて読み込む必要のモジュールが少なくなるためです。また、`const`を使った定数宣言はターゲットにIE11が含まれると`var`に変換されますが、Chromeのみを対象にした場合では`const`のままです。これはChromeでは`const`を解釈できるのでChromeのみをターゲットにした場合は変換不要となるためです。

このように、babelの設定ファイルに書いた設定内容に合わせてJavaScriptが変換されます。これがbabelの機能です。

## Webpackの設定
次にWebpackの設定を行います。WebpackとはJavaScriptの複数のモジュールをまとめるツールです。

先ほどbabelの動作確認で生成したファイルには `require('...')`のようにモジュールを読み込む記述がありました。しかしパッケージの中身は出力したファイルには含まれていません。Webpackを使って、使用しているモジュールもまとめて１つのjsファイルに生成できるように設定をします。

まず必要なパッケージをインストールします。

```shell script
$ npm install webpack webpack-cli
```

アプリケーションディレクトリ直下に`webpack.config.babel.js`を作成します。Webpackの設定ファイルは`webpack.config.js`または`webpack.config.babel.js`という名前である必要があります。今回は設定ファイルもbabelを前提とした書き方をしたいので、必ず`webpack.config.babel.js`という名前にしてください。

それでは作っていきましょう。以下のようにファイルを作成します。
```
youtubeviewer
  ~(中略)~
  └ webpack.config.babel.js
```

作成した`webpack.config.babe.js`に以下のように記述します。

```js
import webpack from 'webpack';
import path from 'path';

export default (env, args) => {
  const rules = [
    {
      test: /\.jsx?$/,
      use: ['babel-loader'],
    },
  ];

  const plugins = [];

  return {
    entry: {
      'app': ['./sample/src/sample.jsx'],
    },
    output: {
      path: path.join(__dirname, './sample/js'),
      filename: '[name].js',
    },
    module: { rules },
    resolve: {
      alias: {
        '~': path.join(__dirname, './src'),
      },
    },
    plugins,
  };
};

```

ここで設定している内容は、概ね以下の通りです。
- `babel-loader`を使って変換する
- `./sample/src/sample.jsx`を`./sample/js/app.js`に出力する
- モジュール読み込み時のパスで`~`で始まるパスは'./src'以下であるとする

（今後コンポーネントを作るにあたって、ディレクトリが深くなった時に相対パス指定をしなくて良いいようにするための設定です）

webpackは色々設定ができますが、詳細を理解するのはアプリケーション作成に慣れてからで良いかと思います。詳しく学びたい方は公式ドキュメントなどを参照してください。

参考）[Webpack Documentation](https://webpack.js.org/concepts/)


設定ファイルの記述ができたら、以下コマンドでビルドします。

```shell script
$ webpack --mode development
```

ビルドしたファイルを見てみましょう。`sample/js/app.js`にファイルが出力されているので中身を見てみましょう。

先ほどbabelだけを使って出力した`sample/output.js`と違って、`require`文が連続した箇所がなく必要なモジュールの内容が１つのファイルに埋め込まれています。

今度はproductionビルドをしてみましょう。productionビルドをすると、デバッグのための出力がなくなり、ソースコードがminifyされます。

では、以下のコマンドでproductionビルドをします。

```shell script
$ webpack --mode production
```

ビルドしたファイルを見てみると、ソースコードがminifyされています。

ローカルで開発時はdevelopmentビルド、リリースする時はproductionビルドをすると使い分けましょう。

## htmlファイルを作成して動作確認
Webpackで生成したjsファイルは、ブラウザで実行できます。それでは動作確認のために、htmlファイルを作成して実装したコンポーネントを表示させてみましょう。

それでは、`sample/index.html`ファイルを作成しましょう。

```
youtubeviewer
  └ sample
    ├ src
    ├ js
    └ index.html <-作成する
```
以下内容を`sample/index.html`に記述します。
```html
<!DOCTYPE html>
<html>
<head>
  <title>Sample</title>
</head>
<body>
  <div id="root"></div>
  <script src="./js/app.js"></script>
</body>
</html>
```

作成したhtmlファイルをブラウザで開いてみましょう。以下のように表示されればOKです。

![Hello react.](./helloreact.png "Hello react")

以上で今回のパートは終了です。

お疲れさまでした。
