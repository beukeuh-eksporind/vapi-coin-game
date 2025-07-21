const Wallet = {
  data: {
    coins: 0,
    xp: 0,
    idr: 0,
    level: 1
  },

  simpan() {
    localStorage.setItem("wallet", JSON.stringify(this.data));
    this.updateTampilan();
  },

  muat() {
    const tersimpan = JSON.parse(localStorage.getItem("wallet"));
    if (tersimpan) {
      this.data = tersimpan;
    }
    this.updateTampilan();
  },

  reset() {
    this.data = { coins: 0, xp: 0, idr: 0, level: 1 };
    this.simpan();
  },

  // ======== Coin ========
  tambahCoin(jumlah) {
    this.data.coins += jumlah;
    this.simpan();
  },

  ambilKoin() {
    return this.data.coins;
  },

  kurangiCoin(jumlah) {
    this.data.coins = Math.max(0, this.data.coins - jumlah);
    this.simpan();
  },

  // ======== XP ========
  tambahXP(jumlah) {
    this.data.xp += jumlah;
    this.simpan();
  },

  setXP(nilai) {
    this.data.xp = nilai;
    this.simpan();
  },

  ambilXP() {
    return this.data.xp;
  },

  // ======== IDR ========
  tambahIDR(jumlah) {
    this.data.idr += jumlah;
    this.simpan();
  },

  ambilIDR() {
    return this.data.idr;
  },

  resetIDR() {
    this.data.idr = 0;
    this.simpan();
  },

  // ======== Level ========
  ambilLevel() {
    return this.data.level;
  },

  tambahLevel(jumlah) {
    this.data.level += jumlah;
    this.simpan();
  },

  setLevel(nilai) {
    this.data.level = nilai;
    this.simpan();
  },

  // ======== UI Update ========
  updateTampilan() {
    document.getElementById("coins").textContent = this.data.coins;
    document.getElementById("xp").textContent = this.data.xp;
    document.getElementById("idr").textContent = this.data.idr;
    document.getElementById("level").textContent = this.data.level;

    const xpBar = document.getElementById("xp-bar");
    if (xpBar) {
      const persen = Math.min((this.data.xp / (this.data.level * 50)) * 100, 100);
      xpBar.style.width = persen + "%";
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Wallet.muat();
});
