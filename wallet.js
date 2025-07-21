const Wallet = {
  // Refresh tampilan dari localStorage
  refreshSemua() {
    document.getElementById("coins").textContent = Wallet.ambilKoin();
    document.getElementById("xp").textContent = Wallet.ambilXP();
    document.getElementById("idr").textContent = Wallet.ambilIDR();
    document.getElementById("level").textContent = Wallet.ambilLevel();

    Wallet.updateXPBar();
  },

  ambilKoin() {
    return parseInt(localStorage.getItem(CONFIG.STORAGE_KEYS.coins)) || 0;
  },

  ambilXP() {
    return parseInt(localStorage.getItem(CONFIG.STORAGE_KEYS.xp)) || 0;
  },

  ambilIDR() {
    return parseInt(localStorage.getItem(CONFIG.STORAGE_KEYS.idr)) || 0;
  },

  ambilLevel() {
    return parseInt(localStorage.getItem(CONFIG.STORAGE_KEYS.level)) || 1;
  },

  tambahKoin(jumlah) {
    const total = Wallet.ambilKoin() + jumlah;
    localStorage.setItem(CONFIG.STORAGE_KEYS.coins, total);
    document.getElementById("coins").textContent = total;
  },

  tambahXP(jumlah) {
    const total = Wallet.ambilXP() + jumlah;
    localStorage.setItem(CONFIG.STORAGE_KEYS.xp, total);
    document.getElementById("xp").textContent = total;
    Wallet.updateXPBar();
  },

  tambahIDR(jumlah) {
    const total = Wallet.ambilIDR() + jumlah;
    localStorage.setItem(CONFIG.STORAGE_KEYS.idr, total);
    document.getElementById("idr").textContent = total;
  },

  naikLevel() {
    const levelBaru = Wallet.ambilLevel() + 1;
    localStorage.setItem(CONFIG.STORAGE_KEYS.level, levelBaru);
    document.getElementById("level").textContent = levelBaru;
  },

  resetIDR() {
    localStorage.setItem(CONFIG.STORAGE_KEYS.idr, 0);
    document.getElementById("idr").textContent = 0;
  },

  resetJikaBaruLogin() {
    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.coins)) {
      localStorage.setItem(CONFIG.STORAGE_KEYS.coins, 0);
      localStorage.setItem(CONFIG.STORAGE_KEYS.xp, 0);
      localStorage.setItem(CONFIG.STORAGE_KEYS.level, 1);
      localStorage.setItem(CONFIG.STORAGE_KEYS.idr, 0);
    }
  },

  updateXPBar() {
    const xp = Wallet.ambilXP();
    const percent = Math.min((xp % 100) * 1, 100); // max 100%
    const xpBar = document.getElementById("xp-bar");
    if (xpBar) {
      xpBar.style.width = percent + "%";
      xpBar.dataset.percent = percent;
    }
  }
};
