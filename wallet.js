const Wallet = {
  inisialisasi: function () {
    const coins = parseInt(localStorage.getItem("coins") || "0");
    const xp = parseInt(localStorage.getItem("xp") || "0");
    const level = parseInt(localStorage.getItem("level") || "1");

    document.getElementById("coins").textContent = coins;
    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;

    this.perbaruiXPBar(xp);
    this.perbaruiIDR(coins);
  },

  tambahKoin: function (jumlah = 1) {
    let coins = parseInt(localStorage.getItem("coins") || "0");
    coins += jumlah;
    localStorage.setItem("coins", coins);
    document.getElementById("coins").textContent = coins;
    this.perbaruiIDR(coins);
  },

  tambahXP: function (jumlah = 1) {
    let xp = parseInt(localStorage.getItem("xp") || "0");
    let level = parseInt(localStorage.getItem("level") || "1");

    xp += jumlah;
    const xpMax = level * 100;

    if (xp >= xpMax) {
      xp -= xpMax;
      level++;
      localStorage.setItem("level", level);
      document.getElementById("level").textContent = level;
    }

    localStorage.setItem("xp", xp);
    document.getElementById("xp").textContent = xp;
    this.perbaruiXPBar(xp, xpMax);
  },

  perbaruiXPBar: function (xp, xpMax = null) {
    const level = parseInt(localStorage.getItem("level") || "1");
    if (!xpMax) xpMax = level * 100;

    const percent = (xp / xpMax) * 100;
    const xpBar = document.getElementById("xp-bar");
    xpBar.style.width = `${percent}%`;
    xpBar.setAttribute("data-percent", percent.toFixed(1));
  },

  perbaruiIDR: function (coins) {
    const rate = Config.rateTukar;
    const rupiah = coins * rate;
    document.getElementById("idr").textContent = rupiah.toLocaleString("id-ID");
  }
};
