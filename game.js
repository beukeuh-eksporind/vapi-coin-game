const Game = {
  xp: 1670,
  coins: 5700,
  idr: 700,
  level: 1,

  init: function () {
    this.updateUI();
    this.setupBabyClick();
  },

  setupBabyClick: function () {
    const baby = document.getElementById("baby-video");
    baby.addEventListener("click", () => {
      this.laughEffect();
      this.showSparkle();
      this.addCoins(10);
    });
  },

  laughEffect: function () {
    const baby = document.getElementById("baby-video");
    const laugh = document.getElementById("laugh-sound");

    // Mainkan suara
    if (laugh) {
      laugh.currentTime = 0;
      laugh.play();
    }

    // Tambah animasi
    baby.classList.add("baby-laughing");

    // Hapus setelah animasi selesai
    setTimeout(() => {
      baby.classList.remove("baby-laughing");
    }, 400);
  },

  showSparkle: function () {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    const size = 16 + Math.random() * 8;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparkle.style.left = Math.random() * window.innerWidth + "px";
    sparkle.style.top = Math.random() * window.innerHeight + "px";

    document.getElementById("sparkle-container").appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  },

  addCoins: function (amount) {
    this.coins += amount;
    this.updateUI();
  },

  cairkan: function () {
    if (this.coins >= 1000) {
      this.coins -= 1000;
      this.idr += 100;
      this.showLog("Berhasil dicairkan 100 IDR 💸");
    } else {
      this.showLog("Koin tidak cukup untuk dicairkan 😢");
    }
    this.updateUI();
  },

  claimDaily: function () {
    this.coins += 500;
    this.xp += 50;
    this.showLog("Klaim harian berhasil 🎁");
    this.updateUI();
  },

  spinWheel: function () {
    const reward = Math.floor(Math.random() * 301) + 200;
    this.coins += reward;
    this.xp += 30;
    this.showLog(`Kamu dapat ${reward} koin dari Spin! 🎲`);
    this.updateUI();
  },

  shareReward: function () {
    this.coins += 300;
    this.xp += 25;
    this.showLog("Terima kasih sudah membagikan! 🤝");
    this.updateUI();
  },

  watchAd: function () {
    this.coins += 250;
    this.xp += 20;
    this.showLog("Kamu dapat hadiah dari iklan 🎉");
    this.updateUI();
  },

  updateUI: function () {
    document.getElementById("idr")?.textContent = this.idr;
    document.getElementById("coins")?.textContent = this.coins;
    document.getElementById("xp")?.textContent = this.xp;

    // Update XP Bar
    const xpBar = document.getElementById("xp-bar");
    const percent = Math.min((this.xp % 1000) / 10, 100);
    xpBar.style.width = percent + "%";
    xpBar.setAttribute("data-percent", percent.toFixed(0));

    // Level Update
    this.level = Math.floor(this.xp / 1000) + 1;
    document.getElementById("level")?.textContent = this.level;
  },

  showLog: function (text) {
    const log = document.getElementById("log");
    if (!log) return;
    log.textContent = text;
    log.classList.add("show");
    setTimeout(() => {
      log.classList.remove("show");
    }, 2000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Game.init();
});
