const Auth = {
  mulai: function () {
    const namaTersimpan = localStorage.getItem("namaPengguna");

    if (namaTersimpan) {
      this.loginSukses(namaTersimpan);
    } else {
      document.getElementById("login-form").style.display = "flex";
      document.getElementById("submit-name").addEventListener("click", () => {
        const namaInput = document.getElementById("input-name").value.trim();
        if (namaInput.length < 3) {
          alert("Nama terlalu pendek.");
          return;
        }
        localStorage.setItem("namaPengguna", namaInput);
        this.loginSukses(namaInput);
      });
    }
  },

  loginSukses: function (nama) {
    document.getElementById("user-name").innerText = nama;
    document.getElementById("login-form").style.display = "none";
  }
};

// Jalankan saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  Auth.mulai();
});
