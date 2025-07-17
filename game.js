const coinSound = new Audio("sounds/coin.wav"); coinSound.volume = 0.5;
const laughSound = new Audio("sounds/baby-laugh.wav"); laughSound.volume = 0.7;

const Game = (() => {
  let coins = +localStorage.getItem("coins") || 0;
  let xp = +localStorage.getItem("xp") || 0;
  let level = +localStorage.getItem("level") || 1;
  const today = new Date().toLocaleDateString();

  function updateDisplay() {
    document.getElementById("coins").innerText = coins;
    document.getElementById("xp").innerText = xp;
    document.getElementById("level").innerText = level;
    document.getElementById("idr").innerText = Math.floor(coins/100).toLocaleString("id-ID");
    updateXPBar();
    localStorage.setItem("coins", coins);
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
  }

  function updateXPBar() {
    const max = level*100, pct = Math.min(xp/max*100,100);
    const bar = document.getElementById("xp-bar");
    bar.style.width = `${pct}%`;
    bar.setAttribute("data-percent", Math.round(pct));
  }

  function addXP(n) {
    xp += n;
    if (xp >= level*100) {
      xp -= level*100;
      level++; coins += 100;
      showLevelUp(); dropPrize();
      showLog(`⭐ Naik Lv.${level} +100 koin`);
    }
    updateDisplay();
  }

  function showLog(msg) {
    const el = document.getElementById("log");
    el.innerText = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2000);
  }

  function spawnCoin(x,y) {
    const el = document.createElement("div");
    el.className = "coin-fly";
    el.innerText = "💰";
    el.style.left = x+"px";
    el.style.top = y+"px";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1000);
  }

  function showLevelUp() {
    const el = document.createElement("div");
    el.className = "level-up-effect";
    el.innerText = "⭐ LEVEL UP!";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1200);
  }

  function dropPrize() {
    const names = ["boneka","botol","mobil","balok"];
    const src = `images/hadiah-${names[Math.floor(Math.random()*names.length)]}.png`;
    const img = document.createElement("img");
    img.src = src;
    img.className = "hadiah";
    img.style.left = Math.random()*60+20+"%";
    document.getElementById("hadiah-container").appendChild(img);
    setTimeout(()=>img.remove(),4000);
  }

  function earn() {
    coins += 10;
    addXP(5);
    showLog("+10 koin, +5 XP!");
    updateDisplay();
    coinSound.currentTime=0; coinSound.play();
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
    showLog("▶️ Menayangkan iklan...");
    setTimeout(() => {
      coins += 50;
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
    const adDate = localStorage.getItem("bubbleAdDate");
    if (adDate === today) {
      showLog("❌ Sudah klaim hari ini.");
      return;
    }
    coins += 50;
    addXP(5);
    localStorage.setItem("bubbleAdDate", today);
    updateDisplay();
    showLog("🎁 Dapat 50 koin dari gelembung!");
    document.getElementById("bubble-ad").style.display = "none";
  }

  function shareReward() {
    coins += 30;
    addXP(5);
    showLog("📤 Bagikan dan dapatkan hadiah!");
    updateDisplay();
  }

  function cairkan() {
    const rp = Math.floor(coins/100);
    if (rp<1000) {
      showLog("❌ Belum mencapai Rp1.000");
      return;
    }
    showLog("✅ Penarikan diproses");
    coins = 0;
    updateDisplay();
  }

  return { updateDisplay, earn, claimDaily, watchAd, spinWheel, claimAdBubble, shareReward, cairkan };
})();

function createSparkle(x,y) {
  const s = document.createElement("div");
  s.className="sparkle";
  s.style.left=x+"px"; s.style.top=y+"px";
  document.getElementById("sparkle-container").appendChild(s);
  setTimeout(()=>s.remove(),1000);
}

document.addEventListener("DOMContentLoaded", () => {
  const vid = document.getElementById("baby-video");
  vid.src = "videos/baby-dance.webm";
  vid.addEventListener("click", (e) => {
    Game.earn();
    laughSound.currentTime = 0;
    laughSound.play();
    createSparkle(e.clientX, e.clientY);
  });
  Game.updateDisplay();
});

// Bubble iklan muncul tiap menit
setInterval(() => {
  const el = document.getElementById("bubble-ad");
  if (!el) return;
  if (el.style.display !== "block") {
    el.style.display = "block";
    el.classList.remove("anim");
    void el.offsetWidth;
    el.classList.add("anim");
    setTimeout(() => el.style.display = "none", 10000);
  }
}, 60000);
