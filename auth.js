const Auth = {
  inisialisasi: function () {
    const nama = localStorage.getItem("namaPengguna");

    if (nama) {
      this.tampilkanNama(nama);
      document.getElementById("login-form").style.display = "none";
    } else {
      document.getElementById("login-form").style.display = "flex";
    }

    document.getElementById("submit-name").addEventListener("click", () => {
      const input = document.getElementById("input-name");
      const namaBaru = input.value.trim();
      if (namaBaru.length > 0) {
        localStorage.setItem("namaPengguna", namaBaru);
        this.tampilkanNama(namaBaru);
        document.getElementById("login-form").style.display = "none";
      }
    });
  },

  tampilkanNama: function (nama) {
    document.getElementById("user-name").textContent = nama;
  }
};

// Jalankan saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  Auth.inisialisasi();
});
