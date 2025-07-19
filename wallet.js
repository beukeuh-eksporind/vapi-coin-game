const Wallet = {
  xp: parseInt(localStorage.getItem("xp")) || 0,
  coins: parseInt(localStorage.getItem("coins")) || 0,
  level: parseInt(localStorage.getItem("level")) || 1,

  tambahCoin: function (jumlah) {
    this.coins += jumlah;
    localStorage.setItem("coins", this.coins);
    document.getElementById("coins").textContent = this.coins;
    document.getElementById("idr").textContent = this.coins * 1; // 1 koin = Rp.1

    // Mainkan suara coin
    const sound = document.getElementById("coin-sound");
    if (sound) sound.play();
  },

  tambahXP: function (jumlah) {
    this.xp += jumlah;
    const nextLevelXP = this.level * 100;

    // Naik level jika XP cukup
    if (this.xp >= nextLevelXP) {
      this.level++;
      this.xp = this.xp - nextLevelXP;
      localStorage.setItem("level", this.level);
      document.getElementById("level").textContent = this.level;
    }

    localStorage.setItem("xp", this.xp);
    this.updateXPBar();
    document.getElementById("xp").textContent = this.xp;
  },

  updateXPBar: function () {
    const xpBar = document.getElementById("xp-bar");
    const percent = (this.xp / (this.level * 100)) * 100;
    xpBar.style.width = `${percent}%`;
    xpBar.setAttribute("data-percent", percent.toFixed(0));
  },

  inisialisasi: function () {
    document.getElementById("coins").textContent = this.coins;
    document.getElementById("idr").textContent = this.coins * 1;
    document.getElementById("xp").textContent = this.xp;
    document.getElementById("level").textContent = this.level;
    this.updateXPBar();
  }
};

// Jalankan saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  Wallet.inisialisasi();
});
