const Exchange = {
  tampilkanFormTukar() {
    // Tampilkan form modal penarikan
    const formHTML = `
      <div class="modal" id="penarikan-modal" style="display:flex;">
        <div class="modal-content">
          <h3>Form Penarikan Saldo</h3>
          <form id="penarikan-form">
            <label>Metode Penarikan</label><br />
            <select name="metode" required>
              <option value="">Pilih</option>
              <option value="DANA">DANA</option>
              <option value="GoPay">GoPay</option>
              <option value="BCA">Bank BCA</option>
              <option value="Rekening Lain">Rekening Lain</option>
            </select><br /><br />

            <label>Nama Rekening / Akun</label><br />
            <input type="text" name="namaRek" required /><br /><br />

            <label>No. Rekening / Nomor HP</label><br />
            <input type="text" name="noRek" required /><br /><br />

            <button type="submit">Kirim Penarikan</button>
            <button type="button" onclick="document.getElementById('penarikan-modal').remove()">Batal</button>
          </form>
        </div>
      </div>
    `;

    // Jika belum ada, tambahkan ke halaman
    if (!document.getElementById('penarikan-modal')) {
      document.body.insertAdjacentHTML('beforeend', formHTML);
    }

    // Handler submit form
    setTimeout(() => {
      document.getElementById('penarikan-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(this);
        const formData = {};
        data.forEach((value, key) => formData[key] = value);
        Exchange.kirimPenarikan(formData);
      });
    }, 100);
  },

  async kirimPenarikan(data) {
    const url = "https://script.google.com/macros/s/AKfycbzThBQMzMqIt1vLeZntGjyq1_E8S9fiQrl2dkSILZDlHkydvyDoztR5L4h9WZMMrGNN/exec";

    const payload = {
      nama: Auth.ambilNama(),
      coins: Wallet.ambilKoin(),
      idr: Wallet.ambilIDR(),
      xp: Wallet.ambilXP(),
      level: Wallet.ambilLevel(),
      metode: data.metode,
      namaRek: data.namaRek,
      noRek: data.noRek
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.text();
      if (result === "OK") {
        alert("✅ Penarikan berhasil dikirim!");
        Wallet.resetIDR(); // Reset saldo IDR ke 0
        document.getElementById("penarikan-modal").remove();
      } else {
        alert("❌ Gagal mengirim. Coba lagi.");
      }
    } catch (err) {
      console.error("Error penarikan:", err);
      alert("❌ Gagal mengirim data penarikan.");
    }
  },

  tampilkanRiwayat() {
    // Kosong atau nanti bisa fetch dari Sheet (opsional)
  },

  iklanSelesai() {
    document.getElementById('ads-modal').style.display = 'none';
  },

  resetSemua(kode) {
    if (kode === 'admin123') {
      localStorage.clear();
      alert('Semua data direset');
      location.reload();
    } else {
      alert('Kode salah!');
    }
  }
};
