// === Audio ===
const coinSound = new Audio("sounds/coin.wav");
coinSound.volume = 0.5;
const laughSound = new Audio("sounds/baby-laugh.wav");
laughSound.volume = 0.7;

// === Game Logic ===
const Game = (() => {
  let coins = +localStorage.getItem("coins") || 0;
  let xp = +localStorage.getItem("xp") || 0;
  let level = +localStorage.getItem("level") || 1;
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
    const xp: 40;
    const maxXP = level * 100;
    const percent = Math.min((xp / maxXP) * 100, 100);
    const bar = document.getElementById("xp-bar");
    bar.style.width = `${percent}%`;
    bar.setAttribute("data-percent", Math.round(percent));
  }

  function earn() {
    coins += 10;
    addXP(5);
    showLog("+10 koin!");
    updateDisplay();
    coinSound.currentTime = 0;
    coinSound.play();
  }

  function addXP(amount) {
    xp += amount;
    const maxXP = level * 100;
    if (xp >= maxXP) {
      xp -= maxXP;
      level++;
      coins += 100;
      showLevelUp();
      dropPrize();
    }
    updateDisplay();
  }

  function showLog(msg) {
    const el = document.getElementById("log");
    el.innerText = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2000);
  }

  function showLevelUp() {
    const el = document.createElement("div");
    el.className = "level-up-effect";
    el.innerText = "⭐ LEVEL UP!";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function dropPrize() {
    const hadiahList = ["boneka", "botol", "mobil", "balok", "balon", "rattle"];
    const nama = hadiahList[Math.floor(Math.random() * hadiahList.length)];
    const src = `images/hadiah-${nama}.png`;

    const img = document.createElement("img");
    img.src = src;
    img.className = "hadiah";
    img.style.left = Math.random() * 60 + 20 + "%";
    document.getElementById("hadiah-container").appendChild(img);

    // Simpan ke localStorage
    const saved = JSON.parse(localStorage.getItem("hadiahList") || "[]");
    saved.push(nama);
    localStorage.setItem("hadiahList", JSON.stringify(saved));
  }

  function spawnCoin(x, y) {
    const coin = document.createElement("div");
    coin.className = "coin-fly";
    coin.innerText = "💰";
    coin.style.left = x + "px";
    coin.style.top = y + "px";
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
  }

  function createSparkle(x, y) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = x + "px";
    s.style.top = y + "px";
    document.getElementById("sparkle-container").appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }

  function tampilkanHadiahTersimpan() {
    const saved = JSON.parse(localStorage.getItem("hadiahList") || "[]");
    const container = document.getElementById("hadiah-container");
    saved.forEach(nama => {
      const img = document.createElement("img");
      img.src = `images/hadiah-${nama}.png`;
      img.className = "hadiah";
      img.style.left = Math.random() * 60 + 20 + "%";
      container.appendChild(img);
    });
  }

  function claimDaily() {
    if (localStorage.getItem("dailyClaim") === today) {
      showLog("❌ Sudah klaim hari ini.");
    } else {
      coins += 50;
      addXP(10);
      localStorage.setItem("dailyClaim", today);
      showLog("✅ Klaim harian berhasil!");
      updateDisplay();
    }
  }

  function watchAd() {
    const last = localStorage.getItem("lastAdTime");
    const now = Date.now();
    const cooldown = 86400000;
    if (last && now - last < cooldown) {
      const sisa = Math.ceil((cooldown - (now - last)) / 1000);
      showLog(`⏳ Tunggu ${sisa} detik lagi.`);
      return;
    }
    showLog("▶️ Menayangkan iklan...");
    setTimeout(() => {
      coins += 50;
      localStorage.setItem("lastAdTime", now);
      showLog("🏵 Dapat 50 koin dari iklan!");
      updateDisplay();
    }, 3000);
  }

  function spinWheel() {
    if (localStorage.getItem("lastSpin") === today) {
      showLog("❌ Spin sudah digunakan hari ini.");
    } else {
      const reward = Math.floor(Math.random() * 91) + 10;
      coins += reward;
      addXP(15);
      localStorage.setItem("lastSpin", today);
      showLog(`🎲 Dapat ${reward} koin dari spin!`);
      updateDisplay();
    }
  }

  function claimAdBubble() {
    if (localStorage.getItem("bubbleAdDate") === today) {
      showLog("❌ Sudah klaim bubble hari ini.");
    } else {
      coins += 50;
      addXP(5);
      localStorage.setItem("bubbleAdDate", today);
      showLog("🎁 Dapat 50 koin dari bubble!");
      document.getElementById("bubble-ad").style.display = "none";
      updateDisplay();
    }
  }

  function shareReward() {
    coins += 30;
    addXP(5);
    showLog("📤 Dapat 30 koin dari share!");
    updateDisplay();
  }

  function cairkan() {
    const rp = Math.floor(coins / 100);
    if (rp < 1000) {
      showLog("❌ Belum mencapai Rp1.000");
      return;
    }
    showLog("✅ Penarikan diproses");
    coins = 0;
    updateDisplay();
  }

  function resetSemua() {
    localStorage.clear();
    location.reload();
  }

  return {
    updateDisplay,
    earn,
    cairkan,
    claimDaily,
    watchAd,
    spinWheel,
    claimAdBubble,
    shareReward,
    addXP,
    spawnCoin,
    createSparkle,
    resetSemua,
    tampilkanHadiahTersimpan
  };
})();
document.addEventListener("DOMContentLoaded", () => {
  const vid = document.getElementById("baby-video");
  vid.src = "videos/baby-dance.webm";

  vid.addEventListener("click", (e) => {
    Game.earn();
    laughSound.currentTime = 0;
    laughSound.play();

    const rect = vid.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.2;

    Game.createSparkle(x, y);
    Game.spawnCoin(x, y);
  });

  Game.updateDisplay();
  Game.tampilkanHadiahTersimpan();

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
});
