// === Suara ===
const coinSound = new Audio("sounds/coin.wav");
coinSound.volume = 0.5;
const laughSound = new Audio("sounds/baby-laugh.wav");
laughSound.volume = 0.7;

// === Game Logic ===
const Game = (() => {
  let coins = parseInt(localStorage.getItem("coins")) || 0;
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  let level = parseInt(localStorage.getItem("level")) || 1;
  const today = new Date().toLocaleDateString();

  function updateDisplay() {
    document.getElementById("coins").innerText = coins;
    document.getElementById("xp").innerText = xp;
    document.getElementById("level").innerText = level;
    document.getElementById("idr").innerText = Math.floor(coins / 100).toLocaleString("id-ID");
    updateXPBar();
    localStorage.setItem("coins", coins);
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
  }

  function updateXPBar() {
    const maxXP = level * 100;
    const percent = Math.min((xp / maxXP) * 100, 100);
    const bar = document.getElementById("xp-bar");
    bar.style.width = `${percent}%`;
    bar.setAttribute("data-percent", Math.round(percent));
  }

  function addXP(amount) {
    xp += amount;
    const maxXP = level * 100;
    if (xp >= maxXP) {
      xp -= maxXP;
      level++;
      coins += 100;
      showLevelUpEffect();
      beriHadiah();
      showLog(`⭐ Level Up ke Lv.${level}! +100 koin`);
    }
    updateDisplay();
  }

  function showLevelUpEffect() {
    const el = document.createElement("div");
    el.className = "level-up-effect";
    el.innerText = "⭐ LEVEL UP!";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function showLog(msg) {
    const log = document.getElementById("log");
    log.innerText = msg;
    log.classList.remove("show");
    void log.offsetWidth;
    log.classList.add("show");
  }

  function spawnCoinAnimation(x, y) {
    const coin = document.createElement("div");
    coin.className = "coin-fly";
    coin.innerText = "💰";
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
  }

  function earnCoin() {
    coins += 10;
    addXP(5);
    showLog("+10 koin, +5 XP!");
    updateDisplay();
    try {
      coinSound.currentTime = 0;
      coinSound.play();
    } catch {}
  }

  function claimDaily() {
    if (localStorage.getItem("dailyClaim") === today) return showLog("❌ Sudah klaim hari ini.");
    coins += 50;
    addXP(10);
    localStorage.setItem("dailyClaim", today);
    showLog("✅ Klaim harian berhasil!");
    updateDisplay();
  }

  function watchAd() {
    const last = localStorage.getItem("lastAdTime");
    const now = Date.now();
    if (last && now - last < 86400000) {
      showLog("⏳ Iklan bisa ditonton besok.");
      return;
    }
    showLog("▶️ Menonton iklan...");
    setTimeout(() => {
      coins += 50;
      localStorage.setItem("lastAdTime", now);
      showLog("🎁 Dapat 50 koin dari iklan!");
      updateDisplay();
    }, 3000);
  }

  function spinWheel() {
    if (localStorage.getItem("lastSpin") === today) return showLog("❌ Sudah spin hari ini.");
    const reward = Math.floor(Math.random() * 91) + 10;
    coins += reward;
    addXP(15);
    localStorage.setItem("lastSpin", today);
    showLog(`🎲 Spin dapat ${reward} koin!`);
    updateDisplay();
  }

  function claimAdBubble() {
    if (localStorage.getItem("bubbleAdDate") === today) return showLog("❌ Sudah klaim gelembung.");
    coins += 50;
    addXP(5);
    localStorage.setItem("bubbleAdDate", today);
    updateDisplay();
    showLog("🎈 Klaim koin dari bubble!");
    document.getElementById("bubble-ad").style.display = "none";
  }

  function shareReward() {
    coins += 30;
    addXP(5);
    showLog("📤 Bagikan dan dapatkan hadiah!");
    updateDisplay();
  }

  function cairkan() {
    const rupiah = Math.floor(coins / 100);
    if (rupiah < 1000) return showLog("❌ Minimum Rp1.000 untuk cairkan.");
    showLog("✅ Penarikan diproses...");
    coins = 0;
    updateDisplay();
  }

  return {
    updateDisplay,
    earnCoin,
    claimDaily,
    watchAd,
    spinWheel,
    claimAdBubble,
    shareReward,
    cairkan,
    addXP
  };
})();

// === Inisialisasi ===
document.addEventListener("DOMContentLoaded", () => {
  Game.updateDisplay();
  const video = document.getElementById("baby-video");
  video.addEventListener("click", (e) => {
    Game.earnCoin();
    laughSound.currentTime = 0;
    laughSound.play();
    const x = e.clientX;
    const y = e.clientY;
    tampilkanSparkle(x, y);
    spawnCoinAnimation(x, y);
  });
});

// === Efek Sparkle ===
function tampilkanSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  document.getElementById("sparkle-container").appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1000);
}

// === Hadiah Jatuh ===
function beriHadiah() {
  const daftarHadiah = [
    "images/hadiah-boneka.png",
    "images/hadiah-botol.png",
    "images/hadiah-mobil.png",
    "images/hadiah-balok.png"
  ];
  const hadiahSrc = daftarHadiah[Math.floor(Math.random() * daftarHadiah.length)];
  const img = document.createElement("img");
  img.src = hadiahSrc;
  img.className = "hadiah";
  img.style.left = Math.floor(Math.random() * 80 + 10) + "%";
  document.getElementById("hadiah-container").appendChild(img);
  setTimeout(() => img.remove(), 4000);
}

// === Bubble Ad Interval ===
setInterval(() => {
  const el = document.getElementById("bubble-ad");
  if (el.style.display !== "block") {
    el.style.display = "block";
    el.classList.remove("anim");
    void el.offsetWidth;
    el.classList.add("anim");
    setTimeout(() => {
      el.style.display = "none";
    }, 10000);
  }
}, 60000);
