# CINEMATICVISION - 映像編集者のための高品質ポートフォリオサイト

## 概要

このプロジェクトは、映像編集者のためのプロフェッショナルなポートフォリオサイトです。モダンなデザイン、洗練されたアニメーション効果、そして直感的なユーザーインターフェースにより、制作した映像作品を効果的に展示し、スキルやサービスをアピールすることができます。YouTube APIを活用した動画再生やパララックス効果など、視覚的に魅力的な要素を多数取り入れています。

## 主な特徴

- モダンでプロフェッショナルなデザイン
- 暗い背景に赤系のアクセントカラー
- 複数のYouTube背景動画（自動切り替え機能付き）
- 洗練されたスクロールアニメーションと表示効果
- パララックスセクションによる没入感の演出
- レスポンシブデザイン（PC、タブレット、スマホ対応）
- 作品のカテゴリーによるフィルタリング機能
- モーダルウィンドウでの作品全画面表示
- 使いやすいお問い合わせフォーム

## プロジェクト構成

```
CINEMATICVISION/
├── index.html          # メインHTMLファイル
├── css/
│   └── style.css       # メインスタイルシート
├── js/
│   └── main.js         # メインJavaScriptファイル
├── img/                # 画像ファイル用ディレクトリ
│   ├── profile.jpg     # プロフィール画像
│   └── parallax.jpg    # パララックス背景画像
└── README.md           # このファイル
```

## セットアップと使用方法

### 1. YouTube動画IDの設定

#### 背景動画の設定
`js/main.js`の以下の部分を編集して、背景動画として使用するYouTube動画のIDを設定します：

```javascript
const backgroundVideos = [
    'n_Dv4JMiwK8', // 1つ目の背景動画
    'JYHq-jy4zII', // 2つ目の背景動画
    'rVQSLJzQfU0'  // 3つ目の背景動画
];
```

※背景動画は10秒ごとに自動で切り替わります。安定して再生できる公式動画のIDを使用することをお勧めします。

#### 作品サンプル動画の設定
`index.html`内の作品セクションで、各作品のYouTube動画IDを設定します：

```html
<div class="youtube-container" data-video-id="bTqVqk7FSmY"></div> <!-- CM動画 -->
<div class="youtube-container" data-video-id="9bZkp7q19f0"></div> <!-- ミュージックビデオ -->
<div class="youtube-container" data-video-id="uD4izuDMUQA"></div> <!-- ショートフィルム -->
```

### 2. 画像の設定

#### プロフィール画像
自分のプロフィール画像をアップロードし、`index.html`内のパスを更新：

```html
<img src="画像のパス" alt="プロフィール写真">
```

※ローカルファイル（例：`img/profile.jpg`）または外部URL（例：Unsplashなどの画像サービス）を使用できます。

#### パララックス背景画像
パララックスセクションの背景画像をアップロードし、`index.html`内のスタイル属性を更新：

```html
<div class="parallax-bg" style="background-image: url('画像のパス');"></div>
```

### 3. 個人情報の更新

#### プロフィール情報
`index.html`内のプロフィールセクションを編集して、自分の情報に更新してください：

```html
<h3>名前</h3>
<p class="profile-title">肩書き</p>
<p class="profile-description">自己紹介文...</p>
```

#### スキルと経験
スキルリストを自分のスキルセットに合わせて更新してください：

```html
<ul>
    <li>スキル1</li>
    <li>スキル2</li>
    <!-- ... -->
</ul>
```

#### SNSリンク
各種SNSリンクを自分のアカウントに更新してください：

```html
<a href="SNSのURL" class="social-icon"><i class="fab fa-twitter"></i></a>
```

### 4. お問い合わせフォームの設定

フォーム送信の処理を実装するには、`js/main.js`内のお問い合わせフォーム送信処理部分を編集してください。実際のフォーム送信処理や、メールサービスとの連携などを実装する必要があります。

## カスタマイズ方法

### デザインのカスタマイズ

#### カラーパレットの変更
`css/style.css`の`:root`セクションで定義されている色を変更できます：

```css
:root {
    --color-primary: #e50914; /* アクセントカラー */
    --color-secondary: #141414; /* セカンダリ背景色 */
    --color-dark: #0a0a0a; /* 暗い背景色 */
    --color-light: #f5f5f5; /* 明るいテキスト色 */
    --color-gray: #717171; /* グレーのテキスト色 */
}
```

#### フォントの変更
1. Google Fontsから好みのフォントを選択
2. HTMLのheadセクションにフォントのリンクを追加/更新
3. `css/style.css`の`:root`セクションでフォント変数を更新：

```css
--font-primary: 'あなたの選んだフォント', sans-serif;
--font-secondary: 'あなたの選んだフォント', sans-serif;
```

### アニメーション効果のカスタマイズ

#### スクロールアニメーションの調整
`css/style.css`の「スクロールアニメーション」セクションで、以下のクラスを編集することで効果を調整できます：

- `.fade-in` - 下から上へのフェードイン
- `.fade-in-left` - 左からのフェードイン
- `.fade-in-right` - 右からのフェードイン

#### アニメーションのタイミング調整
各要素に`--item-index`プロパティを設定することで、アニメーションのタイミングを制御できます：

```html
<div class="fade-in" style="--item-index: 0;">最初に表示される要素</div>
<div class="fade-in" style="--item-index: 1;">少し遅れて表示される要素</div>
<div class="fade-in" style="--item-index: 2;">さらに遅れて表示される要素</div>
```

#### パララックス効果の調整
`js/main.js`内のパララックスセクション処理部分を編集することで、効果の強さを調整できます：

```javascript
// パララックス効果の強さを変更（値を大きくすると効果が強くなる）
const moveY = (offset * 0.4); // 0.4の部分を調整
```

### コンテンツの追加・変更

#### 新しい作品の追加
作品を追加するには、`index.html`の作品セクションに新しい`work-item`要素を追加します：

```html
<div class="work-item fade-in" data-category="カテゴリー名">
    <div class="work-video">
        <div class="youtube-container" data-video-id="YouTube動画ID"></div>
    </div>
    <div class="work-info">
        <h3>作品タイトル</h3>
        <p>作品の説明</p>
        <button class="play-button"><i class="fas fa-play"></i> 再生</button>
    </div>
</div>
```

#### フィルターカテゴリーの変更
フィルターボタンとwork-itemの`data-category`属性を同じ値にすることで、フィルタリングが機能します：

```html
<!-- フィルターボタン -->
<button class="filter-button" data-filter="新カテゴリー">新カテゴリー名</button>

<!-- 対応する作品 -->
<div class="work-item" data-category="新カテゴリー">...</div>
```

## YouTube設定に関する注意事項

YouTubeを使用する際、以下の設定が重要です：

1. **自動再生の制限**: 多くのブラウザでは、ミュートしない限り自動再生が制限されます。このテンプレートでは、すべての背景動画をデフォルトでミュートしています。

2. **埋め込み許可**: 使用する動画が埋め込み可能であることを確認してください。チャンネル所有者が埋め込みを無効にしている場合、動画は表示されません。

3. **安定性**: 公式チャンネルや著名なチャンネルの動画は、削除される可能性が低く安定しています。

4. **モバイル互換性**: すべての動画に`playsinline`属性を設定して、iOSデバイスでもインラインで再生されるようにしています。

## トラブルシューティング

### 動画が表示されない場合
- 動画IDが正しいか確認してください
- 動画が公開されているか、埋め込みが許可されているか確認してください
- ブラウザのコンソールでエラーを確認してください

### スクロールアニメーションが機能しない場合
- JavaScriptエラーがないか確認してください
- クラス名（fade-in, fade-in-left, fade-in-right）が正しく設定されているか確認してください

### レスポンシブデザインの問題
- 異なるデバイスサイズでテストし、必要に応じてCSSのメディアクエリを調整してください

## 技術スタック

- HTML5
- CSS3 (Flexbox, Grid, メディアクエリ, アニメーション, 変数)
- JavaScript (ES6+)
- YouTube IFrame API

## クレジット

- フォントアイコン: [Font Awesome](https://fontawesome.com/)
- フォント: [Google Fonts](https://fonts.google.com/)
- アニメーション: カスタムCSS/JS実装

---

© 2023 CINEMATICVISION. すべての権利を保有します。
