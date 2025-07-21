const Auth = {
  // Mengecek apakah user sudah login
  cekLoginOtomatis() {
    const nama = localStorage.getItem(CONFIG.STORAGE_KEYS.user);
    if (nama) {
      Auth.tampilkanNama(nama);
      Wallet.refreshSemua(); // load data coin, xp, idr
      document.getElementById("login-form").style.display = "none";
    } else {
      document.getElementById("login-form").style.display = "flex";
    }
  },

  // Menyimpan nama user ke localStorage
  login(nama) {
    if (!nama || nama.length < 3) {
      alert("Nama minimal 3 huruf ya.");
      return;
    }

    localStorage.setItem(CONFIG.STORAGE_KEYS.user, nama);
    Auth.tampilkanNama(nama);
    Wallet.resetJikaBaruLogin(); // optional: reset data jika login baru
    document.getElementById("login-form").style.display = "none";
  },

  // Menampilkan nama user di UI
  tampilkanNama(nama) {
    document.getElementById("user-name").textContent = nama;
  }
};

// Event listener tombol login
document.getElementById("submit-name").addEventListener("click", () => {
  const nama = document.getElementById("input-name").value.trim();
  Auth.login(nama);
});
