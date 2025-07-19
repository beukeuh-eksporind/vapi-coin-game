document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const userDisplay = document.getElementById("user-name");

  const storedName = localStorage.getItem("vapiUser");
  if (storedName) {
    form.style.display = "none";
    userDisplay.innerText = storedName;
  } else {
    form.style.display = "flex";
  }

  document.getElementById("submit-name").onclick = () => {
    const name = document.getElementById("input-name").value.trim();
    if (name) {
      localStorage.setItem("vapiUser", name);
      userDisplay.innerText = name;
      form.style.display = "none";
    }
  };
});
