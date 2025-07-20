const Wallet = {
  inisialisasi: function () {
    const coins = parseInt(localStorage.getItem("coins") || "0");
    const xp = parseInt(localStorage.getItem("xp") || "0");
    const level = parseInt(localStorage.getItem("level") || "1");

    document.getElementById("coins").innerText = coins;
    document.getElementById("xp").innerText = xp;
    document.getElementById("level").innerText = level;

    this.updateXpBar(xp, level);
    this.updateIDR(coins);
  },

  tambahKoin: function (jumlah) {
    let coins = parseInt(localStorage.getItem("coins") || "0");
    coins += jumlah;
    localStorage.setItem("coins", coins);
    document.getElementById("coins").innerText = coins;

    this.updateIDR(coins);
  },

  tambahXp: function (jumlah) {
    let xp = parseInt(localStorage.getItem("xp") || "0");
    let level = parseInt(localStorage.getItem("level") || "1");
    xp += jumlah;

    const batas = this.batasXp(level);
    if (xp >= batas) {
      xp = xp - batas;
      level += 1;
      localStorage.setItem("level", level);
      document.getElementById("level").innerText = level;
    }

    localStorage.setItem("xp", xp);
    document.getElementById("xp").innerText = xp;

    this.updateXpBar(xp, level);
  },

  batasXp: function (level) {
    return 10 + level * 5; // Makin tinggi level, makin banyak XP dibutuhkan
  },

  updateXpBar: function (xp, level) {
    const bar = document.getElementById("xp-bar");
    const batas = this.batasXp(level);
    const persen = Math.min(100, Math.floor((xp / batas) * 100));
    bar.style.width = persen + "%";
    bar.setAttribute("data-percent", persen);
  },

  updateIDR: function (coins) {
    const rate = Config.rateTukar;
    const idr = coins * rate;
    document.getElementById("idr").innerText = idr.toLocaleString("id-ID");
  }
};

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  Wallet.inisialisasi();
});
