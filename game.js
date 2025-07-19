// === VapiCoin Game Logic ===
const coinSound = new Audio("sounds/coin.wav");
coinSound.volume = 0.5;
const laughSound = new Audio("sounds/baby-laugh.wav");
laughSound.volume = 0.7;

const Game = (() => {
  let coins = +localStorage.getItem("coins") || 0;
  let xp = +localStorage.getItem("xp") || 0;
  let level = +localStorage.getItem("level") || 1;

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
    bar.style.width = percent + "%";
    bar.dataset.percent = percent;
  }

  function levelUpCheck() {
    const maxXP = level * 100;
    if (xp >= maxXP) {
      level++;
      xp = xp - maxXP;
      laughSound.play();
    }
  }

  function kumpulkanKoin() {
    coins += 10;
    xp += 15;
    coinSound.play();
    levelUpCheck();
    updateDisplay();
  }

  function putarDadu() {
    const hasil = Math.floor(Math.random() * 6) + 1;
    coins += hasil * 5;
    xp += hasil * 8;
    updateDisplay();
  }

  function bagiKoin() {
    if (coins >= 20) {
      coins -= 20;
      xp += 10;
      updateDisplay();
      alert("Koin dibagikan ke sesama pemain!");
    } else {
      alert("Koin tidak cukup untuk dibagi.");
    }
  }

  function cairkan() {
    if (coins >= 100) {
      alert("Koin dicairkan: Rp " + Math.floor(coins / 100 * 1000).toLocaleString());
      coins = 0;
      updateDisplay();
    } else {
      alert("Minimal 100 koin untuk dicairkan.");
    }
  }

  // Inisialisasi saat pertama kali
  window.onload = updateDisplay;

  return {
    kumpulkanKoin,
    putarDadu,
    bagiKoin,
    cairkan
  };
})();
