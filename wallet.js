// === wallet.js ===
const Wallet = {
  saldo: 0,

  tarikUang: function(jumlah) {
    jumlah = parseInt(jumlah);
    if (isNaN(jumlah)) {
      alert("Jumlah tidak valid.");
      return;
    }

    if (jumlah < 1000) {
      alert("Minimal tarik Rp.1000.");
      return;
    }

    if (jumlah > koin) {
      alert("Koin tidak cukup.");
      return;
    }

    // Lanjut proses penarikan
    this.saldo += jumlah;
    koin -= jumlah;

    this.updateIDR();
    updateKoin();
    Exchange.tambahRiwayat(jumlah);
    simpanData();

    alert("Berhasil ditarik Rp." + jumlah);
  },

  updateIDR: function() {
    const idrDisplay = document.getElementById("idr");
    if (idrDisplay) {
      idrDisplay.textContent = this.saldo;
    }
  },

  simpan: function() {
    localStorage.setItem("vapiSaldo", this.saldo);
  },

  muat: function() {
    this.saldo = parseInt(localStorage.getItem("vapiSaldo")) || 0;
    this.updateIDR();
  }
};

// Panggil otomatis saat halaman load
document.addEventListener("DOMContentLoaded", () => {
  Wallet.muat();
});
