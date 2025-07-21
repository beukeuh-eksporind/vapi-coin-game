const Wallet = {
  ambilKoin() {
    return parseInt(localStorage.getItem("coins") || "0");
  },
  ambilXP() {
    return parseInt(localStorage.getItem("xp") || "0");
  },
  ambilLevel() {
    return parseInt(localStorage.getItem("level") || "1");
  },
  ambilIDR() {
    return parseInt(localStorage.getItem("idr") || "0");
  },

  tambahKoin(jumlah) {
    const total = Wallet.ambilKoin() + jumlah;
    localStorage.setItem("coins", total);
    Wallet.updateUI();
  },

  tambahXP(jumlah) {
    let xp = Wallet.ambilXP() + jumlah;
    let level = Wallet.ambilLevel();
    const next = level * 100;

    if (xp >= next) {
      xp -= next;
      level++;
      localStorage.setItem("level", level);
    }

    localStorage.setItem("xp", xp);
    Wallet.updateUI();
  },

  tambahIDR(jumlah) {
    const total = Wallet.ambilIDR() + jumlah;
    localStorage.setItem("idr", total);
    Wallet.updateUI();
  },

  resetIDR() {
    localStorage.setItem("idr", "0");
    Wallet.updateUI();
  },

  reset() {
    localStorage.setItem("coins", "0");
    localStorage.setItem("xp", "0");
    localStorage.setItem("level", "1");
    localStorage.setItem("idr", "0");
  },

  updateUI() {
    document.getElementById("coins").textContent = Wallet.ambilKoin();
    document.getElementById("xp").textContent = Wallet.ambilXP();
    document.getElementById("level").textContent = Wallet.ambilLevel();
    document.getElementById("idr").textContent = Wallet.ambilIDR();

    const xp = Wallet.ambilXP();
    const max = Wallet.ambilLevel() * 100;
    const persen = Math.floor((xp / max) * 100);

    const bar = document.getElementById("xp-bar");
    if (bar) {
      bar.style.width = `${persen}%`;
      bar.setAttribute("data-percent", persen);
    }
  }
};
