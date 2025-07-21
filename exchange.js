const Exchange = {
  minimalPenarikan: 1000, // Minimal IDR agar bisa tarik

  tampilkanFormTukar() {
    const idr = Wallet.ambilIDR();
    const nama = Wallet.ambilNama();

    if (idr < this.minimalPenarikan) {
      alert(`Minimal penarikan adalah Rp ${this.minimalPenarikan.toLocaleString()}`);
      return;
    }

    const metode = prompt("Metode penarikan? (DANA / GoPay / BCA / Lainnya)").trim();
    if (!metode) return;

    const namaRek = prompt("Nama Pemilik Rekening / Akun?").trim();
    if (!namaRek) return;

    const noRek = prompt("Nomor Rekening / Nomor DANA/GoPay?").trim();
    if (!noRek) return;

    const konfirmasi = confirm(`Yakin ingin menarik Rp ${idr.toLocaleString()} ke ${metode}?`);
    if (!konfirmasi) return;

    // Tampilkan modal iklan dulu (kalau kamu pakai SDK iklan, bisa ganti)
    document.getElementById("ads-modal").style.display = "flex";

    // Diselesaikan lewat tombol "Saya sudah menonton"
    this._dataPenarikan = { nama, coins: Wallet.ambilKoin(), idr, xp: Wallet.ambilXP(), level: Wallet.ambilLevel(), metode, namaRek, noRek };
  },

  iklanSelesai() {
    document.getElementById("ads-modal").style.display = "none";

    const data = this._dataPenarikan;
    if (!data) return alert("Data tidak ditemukan.");

    fetch(CONFIG.urlGoogleAppsScript, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) => res.text())
    .then((text) => {
      if (text === "OK") {
        alert("✅ Penarikan berhasil dikirim!\nSaldo akan masuk setelah dicek otomatis.");
        Wallet.resetSaldo();
        this.tampilkanRiwayat();
      } else {
        alert("❌ Gagal mengirim data. Coba lagi.");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("❌ Error saat mengirim data.");
    });
  },

  tampilkanRiwayat() {
    const data = JSON.parse(localStorage.getItem("riwayatPenarikan") || "[]");
    const container = document.getElementById("riwayat");
    if (!container) return;

    if (data.length === 0) {
      container.innerHTML = "<p>Belum ada riwayat penarikan.</p>";
      return;
    }

    container.innerHTML = `
      <h3>Riwayat Penarikan Anda</h3>
      <ul>
        ${data.slice().reverse().map(item => `
          <li>
            ${item.tanggal} • ${item.metode} • Rp ${item.idr.toLocaleString()} ➜ ${item.status || 'Pending'}
          </li>
        `).join("")}
      </ul>
    `;
  },

  simpanRiwayatBaru(entry) {
    const list = JSON.parse(localStorage.getItem("riwayatPenarikan") || "[]");
    entry.tanggal = new Date().toLocaleString("id-ID");
    entry.status = "Pending";
    list.push(entry);
    localStorage.setItem("riwayatPenarikan", JSON.stringify(list));
  },

  resetSemua(kode) {
    if (kode !== CONFIG.kodeAdmin) {
      alert("Kode admin salah!");
      return;
    }

    localStorage.clear();
    location.reload();
  }
};
