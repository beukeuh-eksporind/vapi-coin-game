// exchange.js
const Exchange = {
  tampilkanFormTukar() {
    const idr = Wallet.ambilIDR();
    if (idr < 1000) {
      alert("Minimal IDR yang bisa ditarik adalah Rp 1.000");
      return;
    }

    const existing = document.getElementById("penarikan-form");
    if (existing) existing.remove();

    const form = document.createElement("div");
    form.id = "penarikan-form";
    form.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0008;z-index:9999;display:flex;justify-content:center;align-items:center;">
        <div style="background:#fff;padding:20px;border-radius:12px;width:300px;box-shadow:0 0 20px #0005;">
          <h3>Form Penarikan</h3>
          <label>Metode:</label>
          <select id="metode">
            <option value="Dana">Dana</option>
            <option value="Gopay">Gopay</option>
            <option value="BCA">BCA</option>
            <option value="Mandiri">Mandiri</option>
          </select><br/><br/>

          <label>Nama Penerima:</label><br/>
          <input type="text" id="namaRek" placeholder="Nama rekening"/><br/><br/>

          <label>No Rekening / HP:</label><br/>
          <input type="text" id="noRek" placeholder="Nomor tujuan"/><br/><br/>

          <button onclick="Exchange.kirimFormPenarikan()">Kirim</button>
          <button onclick="document.getElementById('penarikan-form').remove()">Batal</button>
        </div>
      </div>
    `;
    document.body.appendChild(form);
  },

  kirimFormPenarikan() {
    const metode = document.getElementById("metode").value;
    const namaRek = document.getElementById("namaRek").value.trim();
    const noRek = document.getElementById("noRek").value.trim();

    if (!namaRek || !noRek) {
      alert("Semua data harus diisi!");
      return;
    }

    const data = {
      nama: localStorage.getItem("userNama") || "-",
      coins: Wallet.ambilKoin(),
      xp: Wallet.ambilXP(),
      level: Wallet.ambilLevel(),
      idr: Wallet.ambilIDR(),
      metode,
      namaRek,
      noRek,
    };

    // Batasi penarikan 1x per hari
    const hariIni = new Date().toLocaleDateString("id-ID");
    if (localStorage.getItem("lastWithdraw") === hariIni) {
      alert("Penarikan hanya bisa 1x per hari.");
      return;
    }
    localStorage.setItem("lastWithdraw", hariIni);

    fetch("https://script.google.com/macros/s/AKfycbzThBQMzMqIt1vLeZntGjyq1_E8S9fiQrl2dkSILZDlHkydvyDoztR5L4h9WZMMrGNN/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(res => {
        if (res === "OK") {
          Wallet.resetIDR();
          alert("Penarikan berhasil dikirim! Dana akan segera diproses.");
          document.getElementById("penarikan-form").remove();
        } else {
          alert("Gagal mengirim penarikan. Coba lagi.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Terjadi kesalahan saat mengirim.");
      });
  },

  iklanSelesai() {
    document.getElementById("ads-modal").style.display = "none";
    Exchange.tampilkanFormTukar();
  },

  tampilkanRiwayat() {
    const elemen = document.getElementById("riwayat");
    const idr = Wallet.ambilIDR();
    elemen.innerHTML = `<p>IDR kamu saat ini: <strong>Rp ${idr.toLocaleString("id-ID")}</strong></p>`;
  },

  resetSemua(kode) {
    if (kode === "admin123") {
      localStorage.clear();
      location.reload();
    } else {
      alert("Kode salah!");
    }
  }
};
