# GeoCopy (緯度経度抽出ツール)

GeoCopyは、地図上の任意の地点から緯度・経度を素早く取得し、個別にコピーできる軽量なWebユーティリティアプリです。

PCのブラウザ、Chrome拡張機能、およびスマートフォンのPWA（ホーム画面追加）として、あらゆるデバイスで快適に動作するよう設計されています。

## ✨ 特徴

- **直感的な操作**: 地図をタップ（クリック）するか、ピンをドラッグするだけで座標を取得
- **場所検索**: 地名や施設名から目的の場所へジャンプ（OpenStreetMap Nominatim API）
- **個別コピー**: 緯度と経度をそれぞれワンクリックでクリップボードにコピー
- **マルチデバイス対応**: 
  - **Web/PWA**: Vercelによる高速配信とオフライン対応
  - **Chrome拡張機能**: PC作業中にポップアップでいつでも呼び出し可能
- **モダンなデザイン**: ダークモードをベースとしたグラスモーフィズムUI

## 🛠 技術スタック

- **Frontend**: HTML5, Vanilla CSS, JavaScript (ES6+)
- **Map Library**: [Leaflet.js](https://leafletjs.com/)
- **Map Data**: [OpenStreetMap Japan](https://openstreetmap.jp/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Icons**: SVGベースのカスタムアイコン

## 🚀 使い方

### Web版 / スマートフォン (PWA)
1. 公開URL（例: `https://geocopy.vercel.app/`）にアクセス
2. スマホの場合：ブラウザのメニューから「ホーム画面に追加」を選択すると、アプリのように使えます。

### Chrome拡張機能
1. Chromeで `chrome://extensions/` を開く
2. 「デベロッパー モード」をオンにする
3. 「パッケージ化されていない拡張機能を読み込む」を選択
4. 本プロジェクトのフォルダ（`LatLng-copy`）を選択
5. ツールバーのパズルアイコンから「GeoCopy」をピン留めして使用

## 📦 開発者向けセットアップ

1. リポジトリをクローン
2. フォルダをブラウザで直接開くか、ローカルサーバーで実行
3. Vercelに接続して自動デプロイ設定を推奨

## ⚖️ ライセンス / クレジット
- Map Data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- Map Tiles © [OpenStreetMap Japan](https://openstreetmap.jp/)
