# Goal

babel+Webpackの開発環境構築をしながら、babelの役割、Webpackの役割を理解する

# ハンズオンを進める上で必要なツールの導入（Mac）

このパートでは開発を進める上で必要なツールとローカルで動作確認をするために必要なソフトウェアのインストール方法を紹介します。

# テキストエディタ

プログラミングをしていく上で必要であるテキストエディタを準備します。

テキストエディタとは、テキストファイルを作成・編集・保存するためのソフトウェアです。

ご自身で慣れているツール等を既にお使いであれば、そのまま利用していただいて構いません。

初めてエディタを使う方や、特にこだわりが無い方には、IDE(統合開発環境)を使用するのがオススメです。WebStormや、無料でも十分機能のあるVSCodeやAtomなどといったIDEがあります。

[WebStorm](https://www.jetbrains.com/ja-jp/webstorm/) (30日間無料)

[VSCode](https://code.visualstudio.com/)

[Atom](https://atom.io/)

# ターミナル
ターミナルとは、コマンドと呼ばれる命令文を用いてMacの操作や設定を行うためのツールです。ターミナルに関しては、Macにはデフォルトで用意されているので、インストールする必要はありません。

# Node.js環境の構築(Mac)

Webアプリケーションを開発するための環境を構築します。

今回、環境構築するのは、Node.jsです。

もし既にお手元のPCにNode.jsの環境があれば、このパートは読み飛ばしても大丈夫です。

## Homebrewをインストール

Homebrewとは、ソフトウェアの導入を単純化するMac OSのパッケージ管理システムです。

まずは、Homebrewのインストールを行います。既に入っている方は不要です。既に入っているかどうかの確認は、この後の`Homebrewがインストールされているか確認`を参考にして確認できます。

ターミナルを開いて、以下を入力し、エンターキーを押して実行します。

```shell script
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

（コマンドを実行する際に$は含めないでください。行の頭に「$」を表示するスタイルを使って、その例がコマンドラインであることを示しています。）

## Homebrewがインストールされているか確認

Homebrewがインストールされているか確認します。以下のコマンドを実行してください。

```shell script
$ brew -v
Homebrew 2.2.4
Homebrew/homebrew-core (git revision 2562e3; last commit 2020-01-31)
Homebrew/homebrew-cask (git revision d0f4b; last commit 2020-02-01)
```
（筆者のPCでは2.2.4と表示されていますが、インストールした時期によってバージョンは違います。なので2.2.4ではなく、2.2.5など別のバージョンが表示されることもありますが、バージョン(数字)が表示されていればインストールされています。)

## nodenvをインストールする
Homebrewのインストールが終わったら、次にHomebrewを使ってnodenvをインストールします。

nodenvはnodeのバージョン管理を行うソフトウェアです。nodenvをインストールすることでnodeのバージョンの切り替えが容易にできるようになります。それでは下記のコマンドを実行してください。

```shell script
$ brew install nodenv
```

上記のコマンドを実行したらnodenvがインストールされているか確認します。以下のコマンドを実行してバージョンの情報が表示されていればインストールされています。

```shell script
$ nodenv -v
nodenv 1.3.1
```

## nodenvの設定をシェル設定ファイルに記述する

nodeenvの設定とPATHを通す設定をシェルの設定に記述します。

参考）[PATHを通すとは？（Mac OS X）](https://qiita.com/soarflat/items/09be6ab9cd91d366bf71)

まず、ターミナルが使用しているシェルを確認します。

```shell script
$ echo $SHELL
```

`/usr/local/bin/bash` のように表示されたら`bash`, `/usr/local/bin/zsh`のように表示されたら`zsh`を使用しています。

使用しているシェルの設定ファイルに以下コマンドを使ってnodenvの設定を追記し、設定ファイルを再読み込みします。

bashの場合
```shell script
$ echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(nodenv init -)"' >> ~/.bash_profile
$ source ~/.bash_profile
```
zshの場合
```shell script
$ echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(nodenv init -)"' >> ~/.zshrc
$ source ~/.zshrc
```

## Node.jsをインストールする

まずNode.jsをインストールする前に、先ほどインストールしたnodenvを使ってインストール可能なnodeのバージョンを確認します。

以下のコマンドを実行してください。

```shell script
$ nodenv install --list
```

すると下記のようにnodeのインストール可能なバージョンの一覧が表示されます。

```shell script
0.1.14
0.1.15
0.1.16
0.1.17
0.1.18
---中略---
12.14.0
.
.
.
```

現時点(2020年2月時点最新)で最新の安定バージョンとなるnodeのv12.14.0を使用します。nodeはメジャーバージョンが偶数のものが安定バージョンですので、偶数バージョンをインストールすることをお勧めします。

ここでは12.14.0が安定バージョンの中で最新であるため、12.14.0をインストールします。

```shell script
$ nodenv global 12.14.0
```

以下コマンドを実行してnodeのバージョンを確認し、v12.14.0と出ればOKです。
```shell script
$ node -v
```
