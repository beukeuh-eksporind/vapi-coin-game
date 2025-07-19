// === exchange.js ===
const Exchange = {
  tampilkanFormTukar: function () {
    const jumlah = prompt("Masukkan jumlah koin yang ingin ditarik:");
    const nominal = parseInt(jumlah);
    if (!isNaN(nominal)) {
      Wallet.tarikUang(nominal);
    } else {
      alert("Input tidak valid.");
    }
  },

  tambahRiwayat: function (jumlah) {
    const data = JSON.parse(localStorage.getItem("riwayatTukar") || "[]");

    const penarikan = {
      tgl: new Date().toLocaleString("id-ID"),
      jumlah: jumlah
    };

    data.push(penarikan);
    localStorage.setItem("riwayatTukar", JSON.stringify(data));
    this.tampilkanRiwayat();
    Wallet.simpan();
  },

  tampilkanRiwayat: function () {
    const riwayat = JSON.parse(localStorage.getItem("riwayatTukar") || "[]");
    const riwayatDiv = document.getElementById("riwayat");
    if (!riwayatDiv) return;

    if (riwayat.length === 0) {
      riwayatDiv.innerHTML = "<h3>Riwayat Penarikan</h3><p>Belum ada penarikan.</p>";
    } else {
      const listHTML = riwayat
        .reverse()
        .map(item => `<li><strong>${item.tgl}</strong>: Rp.${item.jumlah}</li>`)
        .join("");

      riwayatDiv.innerHTML = `
        <h3>Riwayat Penarikan</h3>
        <ul>${listHTML}</ul>
      `;
    }

    // Tampilkan tombol reset kalau user adalah admin
    const user = localStorage.getItem("vapiUser") || "";
    if (user.toLowerCase() === "admin") {
      const resetBtn = document.createElement("button");
      resetBtn.textContent = "🔒 Reset Riwayat (Admin)";
      resetBtn.style.marginTop = "10px";
      resetBtn.onclick = this.resetRiwayat;
      riwayatDiv.appendChild(resetBtn);
    }
  },

  resetRiwayat: function () {
    if (confirm("Yakin ingin menghapus semua riwayat penarikan di device ini?")) {
      localStorage.removeItem("riwayatTukar");
      Exchange.tampilkanRiwayat();
      alert("Riwayat berhasil di-reset.");
    }
  }
};
