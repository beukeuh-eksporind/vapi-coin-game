// exchange.js (final real-time withdrawal version)

const Exchange = {
  minimalIDR: 5000, // Batas minimal untuk tarik IDR

  tampilkanFormTukar: function () {
    const idr = Wallet.ambilIDR();
    if (idr < this.minimalIDR) {
      alert(`Minimal penarikan adalah Rp ${this.minimalIDR.toLocaleString()}`);
      return;
    }

    const nama = localStorage.getItem("nama") || "";
    const rekening = prompt(`Penarikan sebesar Rp ${idr.toLocaleString()}\n\nMasukkan nomor rekening/DANA:`);
    if (!rekening || rekening.length < 5) {
      alert("Nomor rekening tidak valid.");
      return;
    }

    // Simpan ke Google Sheets
    const data = {
      timestamp: new Date().toLocaleString("id-ID"),
      nama,
      rekening,
      jumlah: idr
    };

    fetch("https://script.google.com/macros/s/AKfycby8EPAUboLQHJH8frPeT4hbBoI8oNZAB7SYZ2U4dhhosW38ezzJ25lHOFbdmh89PyKgHw/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(res => {
      alert("✅ Penarikan berhasil dikirim!\n\nSaldo direset ke 0.");
      Wallet.resetSaldo();
    })
    .catch(err => {
      console.error("❌ Gagal kirim ke Google Sheets:", err);
      alert("Terjadi kesalahan saat mengirim. Coba lagi.");
    });
  },

  // Dummy untuk riwayat
  tampilkanRiwayat: function () {
    const riwayat = document.getElementById("riwayat");
    riwayat.innerHTML = `
      <h3>Riwayat Penarikan</h3>
      <p>Data penarikan ditampilkan otomatis di Google Sheets.</p>
    `;
  },

  resetSemua: function (kode) {
    if (kode !== "vapiadmin") return alert("Kode admin salah");
    localStorage.clear();
    location.reload();
  }
};

// Tambahan untuk reset saldo
Wallet.resetSaldo = function () {
  localStorage.setItem("coins", 0);
  Wallet.tampilkan();
  simpanKeServer();
};
