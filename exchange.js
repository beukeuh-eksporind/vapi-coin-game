// === exchange.js: Penukaran Koin ke Rupiah ===

const Exchange = (() => {
  const KONVERSI = 1000; // 100 koin = Rp1000
  const MIN_COINS = 100;

  function formatRupiah(amount) {
    return "Rp " + amount.toLocaleString("id-ID");
  }

  function tampilkanFormTukar() {
    const koinSekarang = Wallet.getCoins();

    if (!Wallet.canWithdraw()) {
      alert("Kamu sudah menarik koin hari ini. Coba lagi besok ya!");
      return;
    }

    if (koinSekarang < MIN_COINS) {
      alert("Kamu butuh minimal 100 koin untuk bisa menukar.");
      return;
    }

    const jumlahIDR = Math.floor(koinSekarang / 100) * KONVERSI;
    const konfirmasi = confirm(`Tukar ${koinSekarang} koin menjadi ${formatRupiah(jumlahIDR)}?`);

    if (konfirmasi) {
      const sukses = Wallet.deductCoins(Math.floor(koinSekarang / 100) * 100, "withdraw-tukar");
      if (sukses) {
        alert(`Berhasil ditukar ${formatRupiah(jumlahIDR)}! Silakan hubungi admin untuk pencairan.`);
        // Redirect atau tampilkan info WA admin di sini
        window.open("https://wa.me/628xxxxxx?text=Halo%20admin,%20saya%20ingin%20menarik%20${formatRupiah(jumlahIDR)}%20dari%20VapiCoin.", "_blank");
      } else {
        alert("Gagal menukar. Cek saldo kamu.");
      }
    }
  }

  return {
    tampilkanFormTukar
  };
})();
