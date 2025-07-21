const Exchange = {
  tampilkanFormTukar() {
    console.log("Form penarikan dipanggil");

    const idr = Wallet.ambilIDR();
    const batasMinimal = 1000;

    if (idr < batasMinimal) {
      alert(`Minimal penarikan adalah Rp ${batasMinimal.toLocaleString()}`);
      return;
    }

    const nama = localStorage.getItem("user") || "";
    const metode = prompt("Masukkan metode penarikan (DANA / GoPay / BCA dll):", "DANA");
    const namaRek = prompt("Nama penerima / nama rekening:");
    const noRek = prompt("Nomor akun / rekening:");

    if (!metode || !namaRek || !noRek) {
      alert("Semua data harus diisi!");
      return;
    }

    Exchange.kirimPenarikan({ nama, metode, namaRek, noRek });
  },

  kirimPenarikan({ nama, metode, namaRek, noRek }) {
    const coins = Wallet.ambilKoin();
    const xp = Wallet.ambilXP();
    const level = Wallet.ambilLevel();
    const idr = Wallet.ambilIDR();

    const data = {
      nama, coins, xp, level, idr,
      metode, namaRek, noRek
    };

    fetch("https://script.google.com/macros/s/AKfycbzThBQMzMqIt1vLeZntGjyq1_E8S9fiQrl2dkSILZDlHkydvyDoztR5L4h9WZMMrGNN/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(res => {
      if (res === "OK") {
        alert("✅ Penarikan berhasil diajukan!\nTunggu beberapa menit.");
        Wallet.resetIDR();
      } else {
        alert("❌ Gagal mengirim data. Coba lagi.");
      }
    })
    .catch(err => {
      console.error("Gagal:", err);
      alert("❌ Terjadi kesalahan saat kirim data.");
    });
  }
};

// Pastikan global
window.Exchange = Exchange;
