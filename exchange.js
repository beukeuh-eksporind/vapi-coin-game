const Exchange = {
  tampilkanRiwayat: () => {
    const riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
    const container = document.getElementById("riwayat");
    if (!container) return;

    container.innerHTML = `
      <h3>Riwayat Penarikan</h3>
      <ul>
        ${riwayat.map(item => `<li>${item.tanggal} • 💰 ${item.idr} IDR • ${item.coins} koin</li>`).join("")}
      </ul>
    `;
  },

  tampilkanFormTukar: () => {
    Exchange.kirimPenarikanKeSheets(); // Langsung jalankan penarikan via Google Sheets
  },

  kirimPenarikanKeSheets: () => {
    const nama = localStorage.getItem("nama");
    const coins = Wallet.ambilKoin();
    const idr = Wallet.ambilIDR();
    const rekening = prompt("Masukkan nomor rekening Anda:");

    if (!nama) {
      alert("❌ Anda belum login.");
      return;
    }

    if (!rekening || rekening.length < 6) {
      alert("❌ Nomor rekening tidak valid.");
      return;
    }

    if (coins < 500) {
      alert("❌ Minimal 500 koin untuk tarik uang.");
      return;
    }

    const data = {
      nama,
      coins,
      idr,
      rekening,
      tanggal: new Date().toLocaleDateString("id-ID"),
    };

    // Simpan lokal untuk riwayat
    const riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
    riwayat.push(data);
    localStorage.setItem("riwayat", JSON.stringify(riwayat));
    Exchange.tampilkanRiwayat();

    // Kirim ke Google Sheets
    fetch("https://script.google.com/macros/s/AKfycby8EPAUboLQHJH8frPeT4hbBoI8oNZAB7SYZ2U4dhhosW38ezzJ25lHOFbdmh89PyKgHw/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          alert("✅ Permintaan penarikan berhasil dikirim. Tunggu verifikasi.");
        } else {
          alert("❌ Gagal kirim ke Google Sheets.");
        }
      })
      .catch(err => {
        console.error("Gagal koneksi:", err);
        alert("❌ Terjadi kesalahan saat mengirim data.");
      });
  },

  resetSemua: (kode) => {
    if (kode === "admin123") {
      localStorage.clear();
      alert("✅ Semua data telah direset.");
      location.reload();
    } else {
      alert("❌ Kode admin salah.");
    }
  }
};
