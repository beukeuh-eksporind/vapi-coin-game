const Exchange = {
  pendingPenarikan: 0,

  tampilkanFormTukar: function () {
    const coinSaatIni = parseInt(localStorage.getItem("coins") || "0");
    const terakhirTarik = localStorage.getItem("terakhirTarik");
    const hariIni = new Date().toDateString();

    if (coinSaatIni < Config.minimalPenarikan) {
      alert(Config.getInfoPenarikan());
      return;
    }

    if (terakhirTarik === hariIni) {
      alert("⚠️ Kamu sudah melakukan penarikan hari ini. Coba lagi besok!");
      return;
    }

    // Simpan dulu jumlah penarikan yang akan diproses
    this.pendingPenarikan = coinSaatIni;

    // Tampilkan modal iklan dulu
    const modal = document.getElementById("ads-modal");
    if (modal) modal.style.display = "flex";
  },

  iklanSelesai: function () {
    const modal = document.getElementById("ads-modal");
    if (modal) modal.style.display = "none";

    const nominal = this.pendingPenarikan * Config.rateTukar;
    const nama = localStorage.getItem("namaPengguna") || "Pengguna";

    alert(`💸 ${nama}, kamu menarik Rp${nominal.toLocaleString('id-ID')}! Dana sedang diproses otomatis.`);

    const riwayat = JSON.parse(localStorage.getItem("riwayatPenarikan") || "[]");
    riwayat.push({
      tanggal: new Date().toLocaleString('id-ID'),
      jumlah: nominal
    });
    localStorage.setItem("riwayatPenarikan", JSON.stringify(riwayat));

    localStorage.setItem("terakhirTarik", new Date().toDateString());
    localStorage.setItem("coins", "0");
    localStorage.setItem("xp", "0");
    Wallet.inisialisasi();
    this.tampilkanRiwayat();
  },

  tampilkanRiwayat: function () {
    const riwayat = JSON.parse(localStorage.getItem("riwayatPenarikan") || "[]");
    const div = document.getElementById("riwayat");
    if (!div) return;

    let html = "<h3>Riwayat Penarikan</h3><ul>";
    riwayat.reverse().forEach(item => {
      html += `<li>${item.tanggal} — Rp${item.jumlah.toLocaleString('id-ID')}</li>`;
    });
    html += "</ul>";
    div.innerHTML = html;
  },

  resetSemua: function (kodeAdmin) {
    if (kodeAdmin !== "vareset2025") {
      alert("❌ Kode admin salah!");
      return;
    }

    localStorage.removeItem("riwayatPenarikan");
    localStorage.removeItem("terakhirTarik");
    localStorage.setItem("coins", "0");
    localStorage.setItem("xp", "0");
    localStorage.setItem("level", "1");

    alert("✅ Semua data pengguna berhasil direset.");
    Wallet.inisialisasi();
    this.tampilkanRiwayat();
  }
};
