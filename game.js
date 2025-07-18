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
      showLevelUp();
      dropPrize();
    }
    updateDisplay();
  }

  function earn() {
    coins += 10;
    addXP(5);
    showLog("+10 koin!");
    updateDisplay();
    try {
      coinSound.currentTime = 0;
      coinSound.play();
    } catch {}
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
    const hadiah = ["boneka", "botol", "mobil", "balok"];
    const src = `images/hadiah-${hadiah[Math.floor(Math.random() * hadiah.length)]}.png`;
    const img = document.createElement("img");
    img.src = src;
    img.className = "hadiah";
    img.style.left = Math.random() * 60 + 20 + "%";
    document.getElementById("hadiah-container").appendChild(img);
    setTimeout(() => img.remove(), 3000);
  }

  function spawnCoin(x, y) {
    const coin = document.createElement("div");
    coin.className = "coin-fly";
    coin.innerText = "💰";
    coin.style.left = x+ "px";
    coin.style.top = y+ "px";
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
  }
 function dropPrize() {
  const hadiah = ["boneka", "botol", "mobil", "balok"];
  const nama = hadiah[Math.floor(Math.random() * hadiah.length)];
  const src = `images/hadiah-${nama}.png`;

  // Jatuhkan dari atas
  const img = document.createElement("img");
  img.src = src;
  img.className = "hadiah";
  img.style.left = Math.random() * 60 + 20 + "%";
  document.getElementById("hadiah-container").appendChild(img);
  setTimeout(() => img.remove(), 3000);

  // Tampilkan di bawah XP bar
  const hadiahBaru = document.createElement("img");
  hadiahBaru.src = src;
  document.getElementById("hadiah-terkumpul").appendChild(hadiahBaru);
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
    const lastAdTime = localStorage.getItem("lastAdTime");
    const now = Date.now();
    const cooldown = 86400000;
    if (lastAdTime && now - lastAdTime < cooldown) {
      const sisa = Math.ceil((cooldown - (now - lastAdTime)) / 1000);
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
  };
})();

// === Sparkle ===
function createSparkle(x, y) {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = x + "px";
  s.style.top = y + "px";
  document.getElementById("sparkle-container").appendChild(s);
  setTimeout(() => s.remove(), 1000);
}

// === Inisialisasi ===
document.addEventListener("DOMContentLoaded", () => {
  const vid = document.getElementById("baby-video");

  vid.addEventListener("click", (e) => {
    Game.earn();
    laughSound.currentTime = 0;
    laughSound.play();
    createSparkle(e.clientX, e.clientY);

    // 💰 muncul di atas kepala bayi
    const rect = vid.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - 30;
    spawnCoin(x, y);
  });

  Game.updateDisplay();

  // Bubble muncul tiap 60 detik
  setInterval(() => {
    const el = document.getElementById("bubble-ad");
    if (el && el.style.display !== "block") {
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
