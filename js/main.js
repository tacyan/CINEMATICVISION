/**
 * CINEMATICVISION - 動画編集者ポートフォリオサイト用JavaScriptファイル
 * 
 * このファイルは、サイトのインタラクティブな要素や動的な機能を制御します。
 * - ハンバーガーメニューの制御
 * - YouTube背景動画の設定
 * - 作品集のフィルタリング機能
 * - モーダルウィンドウの制御
 * などの機能を実装しています。
 */

// DOMが完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
  
  /**
   * ハンバーガーメニューの制御
   * スマホ表示時のメニュー開閉を管理します
   */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // ナビゲーションリンクをクリックした時にメニューを閉じる
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  /**
   * スクロール時のヘッダー背景変更
   * スクロールすると、ヘッダーの背景を不透明にします
   */
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
      header.style.padding = '15px 0';
    } else {
      header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
      header.style.padding = '20px 0';
    }
  });
  
  /**
   * 作品集フィルタリング
   * カテゴリーボタンによる作品のフィルタリングを制御します
   */
  const filterButtons = document.querySelectorAll('.filter-button');
  const workItems = document.querySelectorAll('.work-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // アクティブクラスを切り替え
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // 作品の表示/非表示を切り替え
      workItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  /**
   * モーダルウィンドウの制御
   * 作品をクリックしたときにモーダルウィンドウを表示します
   */
  const modal = document.getElementById('videoModal');
  const closeModal = document.querySelector('.close-modal');
  const playButtons = document.querySelectorAll('.play-button');
  
  // 閉じるボタンでモーダルを閉じる
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      const modalVideo = document.getElementById('modal-video');
      if (modalVideo) {
        modalVideo.innerHTML = '';
      }
    });
  }
  
  // モーダルの外側をクリックして閉じる
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      const modalVideo = document.getElementById('modal-video');
      if (modalVideo) {
        modalVideo.innerHTML = '';
      }
    }
  });
  
  // 再生ボタンをクリックしてモーダルを開く
  playButtons.forEach(button => {
    button.addEventListener('click', function() {
      const workItem = this.closest('.work-item');
      const videoContainer = workItem.querySelector('.youtube-container');
      const videoId = videoContainer.getAttribute('data-video-id');
      
      const modalVideo = document.getElementById('modal-video');
      modalVideo.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&origin=${window.location.origin}&playsinline=1&showinfo=0&rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      
      modal.style.display = 'block';
    });
  });
});

/**
 * YouTube IFrame API の制御
 * 背景動画とサムネイル動画の設定を行います
 */
let player;
let workPlayers = [];
let currentVideoIndex = 0;
const backgroundVideos = [
    'n_Dv4JMiwK8', // 安定した背景動画
    'JYHq-jy4zII', // Adobe創造的編集ショーリール
    'rVQSLJzQfU0'  // 映像編集テクニックショーケース
];

// YouTube APIの読み込み
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/**
 * YouTube APIが準備完了になったら呼び出される関数
 */
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-bg', {
        videoId: backgroundVideos[currentVideoIndex],
        playerVars: {
            autoplay: 1,
            loop: 0,
            controls: 0,
            showinfo: 0,
            rel: 0,
            enablejsapi: 1,
            modestbranding: 1,
            mute: 1,
            origin: window.location.origin,
            playsinline: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    
    // 作品プレーヤーの初期化
    initWorkPlayers();
}

/**
 * プレーヤーの準備完了時に呼び出される関数
 * @param {Object} event - YouTubeプレーヤーイベント
 */
function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
    
    // プレーヤーのスタイルを設定
    const iframe = document.querySelector('#youtube-bg iframe');
    if (iframe) {
        iframe.style.position = 'absolute';
        iframe.style.top = '50%';
        iframe.style.left = '50%';
        iframe.style.transform = 'translate(-50%, -50%)';
        iframe.style.width = '100vw';
        iframe.style.height = '56.25vw'; // 16:9アスペクト比
        iframe.style.minHeight = '100vh';
        iframe.style.minWidth = '177.77vh'; // 反転したアスペクト比
    }
    
    // 背景動画を一定時間ごとに切り替え
    setInterval(changeBackgroundVideo, 10000);
}

/**
 * プレーヤーの状態変更時に呼び出される関数
 * @param {Object} event - YouTubeプレーヤーイベント
 */
function onPlayerStateChange(event) {
    // 動画が終了したら、次の動画に切り替え
    if (event.data === YT.PlayerState.ENDED) {
        changeBackgroundVideo();
    }
}

/**
 * 背景動画を次の動画に切り替える関数
 */
function changeBackgroundVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    player.loadVideoById(backgroundVideos[currentVideoIndex]);
    player.mute();
}

// 作品セクションのYouTubeプレーヤー初期化
function initWorkPlayers() {
    // 作品のサムネイル動画プレーヤーの作成
    const workContainers = document.querySelectorAll('.youtube-container');
    workContainers.forEach((container, index) => {
        const videoId = container.getAttribute('data-video-id');
        if (videoId) {
            const playerId = 'work-player-' + index;
            container.innerHTML = `<div id="${playerId}"></div>`;
            
            const workPlayer = new YT.Player(playerId, {
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    start: 10,
                    loop: 1,
                    playlist: videoId,
                    controls: 0,
                    showinfo: 0,
                    mute: 1,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    rel: 0,
                    origin: window.location.origin,
                    playsinline: 1
                },
                events: {
                    'onReady': function(event) {
                        event.target.mute();
                        event.target.playVideo();
                        
                        setTimeout(() => {
                            if (event.target.getPlayerState() !== YT.PlayerState.PLAYING) {
                                event.target.playVideo();
                            }
                        }, 2000);
                    },
                    'onStateChange': function(event) {
                        if (event.data === YT.PlayerState.ENDED || 
                            event.data === YT.PlayerState.UNSTARTED || 
                            event.data === YT.PlayerState.CUED) {
                            setTimeout(() => {
                                event.target.playVideo();
                            }, 1000);
                        }
                    }
                }
            });
            
            workPlayers.push(workPlayer);
        }
    });
}

// モバイルデバイスかどうかを判定
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

/**
 * スクロールアニメーション
 * 要素が画面内に入ったときにアニメーションを実行します
 */
const animationElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .parallax-content');
const parallaxBg = document.querySelector('.parallax-bg');
const sectionElements = document.querySelectorAll('section');

// スクロール時のアニメーション処理
function checkAnimations() {
  // ビューポートの寸法を取得
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const triggerBottom = windowHeight * 0.85;
  const triggerTop = windowHeight * 0.15;
  
  // 各アニメーション要素のチェック
  animationElements.forEach(element => {
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top;
    const elementBottom = elementRect.bottom;
    
    // 要素が表示範囲内に入ったとき（上スクロールでも下スクロールでも）
    const isVisible = 
      (elementTop < triggerBottom && elementTop > triggerTop) || 
      (elementBottom > triggerTop && elementBottom < triggerBottom) ||
      (elementTop <= triggerTop && elementBottom >= triggerBottom);
    
    if (isVisible) {
      // スタガーエフェクト用のインデックスがない場合は設定
      if (!element.style.getPropertyValue('--item-index') && element.classList.contains('stagger-item')) {
        const siblings = Array.from(element.parentNode.children);
        const index = siblings.indexOf(element);
        element.style.setProperty('--item-index', index);
      }
      
      // 要素がまだアクティブでない場合のみアニメーション効果を適用
      if (!element.classList.contains('active')) {
        element.classList.add('active');
      }
    } else {
      // ビューポートから出たら要素を非アクティブに（リピートアニメーション用）
      if (element.classList.contains('active') && 
          (elementTop > windowHeight || elementBottom < 0)) {
        element.classList.remove('active');
      }
    }
  });
  
  // パララックスセクションの処理
  sectionElements.forEach(section => {
    const rect = section.getBoundingClientRect();
    
    // 画面内にセクションが表示されているか
    if (rect.top < windowHeight && rect.bottom > 0) {
      const sectionParallaxBg = section.querySelector('.parallax-bg');
      
      if (sectionParallaxBg) {
        // スクロール位置に応じたパララックス効果
        const scrollPosition = window.pageYOffset;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const offset = scrollPosition - sectionTop;
        
        // スクロール量に応じた移動量を計算（上方向のスクロールでは逆方向に移動）
        const moveY = (offset * 0.4) + (window.innerHeight * 0.1);
        
        // 要素が表示範囲内にある場合にのみ変形を適用
        if (offset > -windowHeight && offset < sectionHeight + windowHeight) {
          sectionParallaxBg.style.transform = `translateY(${moveY}px) scale(1.05)`;
          // スクロール量に応じて不透明度も微調整
          const opacity = Math.min(0.7, 0.5 + (Math.abs(offset) / (sectionHeight * 2)));
          sectionParallaxBg.style.opacity = opacity;
        }
      }
      
      // セクション内の他の要素にもスクロール量に応じた効果を追加
      const parallaxContent = section.querySelector('.parallax-content');
      if (parallaxContent && parallaxContent.classList.contains('active')) {
        const contentRect = parallaxContent.getBoundingClientRect();
        const centerOffset = (windowHeight / 2 - (contentRect.top + contentRect.height / 2)) * 0.05;
        parallaxContent.style.transform = `translateY(${centerOffset}px) scale(1)`;
      }
    }
  });
}

// 初期表示時にも実行
window.addEventListener('load', function() {
  setTimeout(checkAnimations, 300); // ページロード後、少し遅延させて実行
});

// スクロール時に実行
window.addEventListener('scroll', function() {
  requestAnimationFrame(checkAnimations); // パフォーマンス向上のためにrequestAnimationFrameを使用
});

// リサイズ時にも再計算
window.addEventListener('resize', function() {
  setTimeout(checkAnimations, 100);
});

/**
 * お問い合わせフォーム送信処理
 * フォーム送信時のバリデーションと送信処理を行います
 */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 送信ボタンを無効化
    const submitButton = contactForm.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.textContent = '送信中...';
    
    // フォームデータの取得
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // ここに実際の送信処理を実装（サーバーサイドやメールサービスなど）
    // サンプルとして、送信成功を模擬
    setTimeout(function() {
      // 送信成功の処理
      submitButton.textContent = '送信完了';
      submitButton.style.backgroundColor = '#4caf50';
      
      // フォームをリセット
      contactForm.reset();
      
      // 3秒後に元に戻す
      setTimeout(function() {
        submitButton.disabled = false;
        submitButton.textContent = '送信する';
        submitButton.style.backgroundColor = '';
      }, 3000);
    }, 2000);
  });
} 