// === Suara ===
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
    const max = level * 100;
    const pct = Math.min((xp / max) * 100, 100);
    const bar = document.getElementById("xp-bar");
    if (bar) {
      bar.style.width = `${pct}%`;
      bar.setAttribute("data-percent", Math.round(pct));
    }
  }

  function addXP(n) {
    xp += n;
    if (xp >= level * 100) {
      xp -= level * 100;
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

  function spawnCoin(x, y) {
    const el = document.createElement("div");
    el.className = "coin-fly";
    el.innerText = "💰";
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  function showLevelUp() {
    const el = document.createElement("div");
    el.className = "level-up-effect";
    el.innerText = "⭐ LEVEL UP!";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function dropPrize() {
    const hadiahList = ["boneka", "botol", "mobil", "balok"];
    const nama = hadiahList[Math.floor(Math.random() * hadiahList.length)];
    const img = document.createElement("img");
    img.src = `images/hadiah-${nama}.png`;
    img.className = "hadiah";
    img.style.left = `${Math.random() * 60 + 20}%`;
    document.getElementById("hadiah-container").appendChild(img);
    setTimeout(() => img.remove(), 4000);
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

  function cairkan() {
    const rp = Math.floor(coins / 100);
    if (rp < 1000) {
      showLog("❌ Belum Rp1.000");
      return;
    }
    showLog("✅ Penarikan diproses");
    coins = 0;
    updateDisplay();
  }

  return {
    updateDisplay,
    earn,
    cairkan
  };
})();

// === Sparkle Effect ===
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
  if (vid) {
    vid.src = "videos/baby-dance.webm";

    vid.addEventListener("click", (e) => {
      Game.earn();
      try {
        laughSound.currentTime = 0;
        laughSound.play();
      } catch {}
      createSparkle(e.clientX, e.clientY);
      spawnCoin(e.clientX, e.clientY);
    });
  }

  Game.updateDisplay();
});
