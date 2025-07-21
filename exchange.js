const Exchange = {
  // Menampilkan form penarikan
  tampilkanFormTukar() {
    const idr = Wallet.ambilIDR();
    const batasMinimal = CONFIG.MIN_PENARIKAN_IDR;

    if (idr < batasMinimal) {
      alert(`💰 Minimal penarikan adalah Rp ${batasMinimal.toLocaleString()}`);
      return;
    }

    const nama = localStorage.getItem("user") || "";
    const metode = prompt("Metode penarikan (DANA / GoPay / BCA dll):", "DANA");
    const namaRek = prompt("Nama penerima / rekening:");
    const noRek = prompt("Nomor akun / rekening:");

    if (!metode || !namaRek || !noRek) {
      alert("❌ Semua data harus diisi!");
      return;
    }

    // Kirim ke server lokal
    Exchange.kirimPenarikan({ nama, metode, namaRek, noRek });
  },

  // Kirim data penarikan ke backend
  kirimPenarikan({ nama, metode, namaRek, noRek }) {
    const coins = Wallet.ambilKoin();
    const xp = Wallet.ambilXP();
    const level = Wallet.ambilLevel();
    const idr = Wallet.ambilIDR();

    const data = {
      nama,
      coins,
      xp,
      level,
      idr,
      metode,
      namaRek,
      noRek,
      status: "Belum Dibayar",
      waktu: new Date().toISOString()
    };

    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          alert("✅ Penarikan berhasil diajukan!");
          Wallet.resetIDR();
        } else {
          throw new Error("Gagal mengirim ke server.");
        }
      })
      .catch(err => {
        console.error("❌ Gagal kirim:", err);
        alert("❌ Gagal mengirim data. Coba lagi.");
      });
  },

  // Menampilkan daftar penarikan dari server lokal
  tampilkanRiwayat() {
    fetch(`${CONFIG.SERVER_URL}/api/users`, ...)
      .then(res => res.json())
      .then(users => {
        const el = document.getElementById("riwayat");
        el.innerHTML = "<h3>Riwayat Penarikan</h3><ul>" +
          users.slice().reverse().map(u =>
            `<li>${u.nama} • Rp ${u.idr.toLocaleString()} • ${u.metode}</li>`
          ).join("") +
          "</ul>";
      })
      .catch(err => {
        console.warn("⚠️ Gagal ambil riwayat:", err);
      });
  },

  // Admin reset semua data (opsional)
  resetSemua(kode) {
    if (kode === "admin123") {
      localStorage.clear();
      location.reload();
    } else {
      alert("❌ Kode salah");
    }
  },

  // Simulasi selesai nonton iklan
  iklanSelesai() {
    document.getElementById("ads-modal").style.display = "none";
    Exchange.tampilkanFormTukar();
  }
};
