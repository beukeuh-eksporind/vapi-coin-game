const Auth = {
  cekLoginOtomatis() {
    const nama = localStorage.getItem("nama");
    if (nama) {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("user-name").textContent = nama;
      Wallet.updateUI();
    } else {
      document.getElementById("login-form").style.display = "flex";
    }

    document.getElementById("submit-name").addEventListener("click", () => {
      const input = document.getElementById("input-name").value.trim();
      if (input) {
        localStorage.setItem("nama", input);
        document.getElementById("user-name").textContent = input;
        document.getElementById("login-form").style.display = "none";
        Wallet.reset(); // mulai baru
        Wallet.updateUI();
      }
    });
  },

  ambilNama() {
    return localStorage.getItem("nama") || "Tidak Dikenal";
  }
};
