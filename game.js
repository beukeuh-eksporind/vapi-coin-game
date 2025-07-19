
// === game.js ===

let koin = 0;
let xp = 0;

const koinDisplay = document.getElementById("coins");
const xpDisplay = document.getElementById("xp");
const coinSound = new Audio("sounds/coin.wav");

// Tambah koin & XP
function tambahKoin(jumlah) {
  koin += jumlah;
  updateKoin();
  simpanData();
}

function tambahXP(jumlah) {
  xp += jumlah;
  updateXP();
  simpanData();
}
function updateIDR() {
  const idrDisplay = document.getElementById("idr");
  const konversi = Math.floor(koin); // 1 coin = Rp.1
  idrDisplay.textContent = konversi;
}

function updateKoin() {
  koinDisplay.textContent = koin;
}

function updateXP() {
  xpDisplay.textContent = xp;
  const xpPercent = Math.min(100, (xp % 100));
  const xpBar = document.getElementById("xp-bar");
  if (xpBar) {
    xpBar.style.width = xpPercent + "%";
  }
}

function playCoinSound() {
  coinSound.currentTime = 0;
  coinSound.play();
}

function showFlyingEmoji(emoji) {
  const emojiEl = document.createElement("div");
  emojiEl.textContent = emoji;
  emojiEl.className = "flying-emoji";
  emojiEl.style.left = `${Math.random() * 80 + 10}%`;
  document.body.appendChild(emojiEl);
  setTimeout(() => emojiEl.remove(), 2000);
}

// Bonus harian
function klaimBonusHarian() {
  const hariIni = new Date().toLocaleDateString();
  const terakhirBonus = localStorage.getItem("terakhirBonus");

  if (terakhirBonus !== hariIni) {
    tambahKoin(100);
    localStorage.setItem("terakhirBonus", hariIni);
    showFloatingMessage("🎁 Bonus harian +100 koin!");
  }
}

function showFloatingMessage(teks) {
  const msg = document.createElement("div");
  msg.className = "floating-msg";
  msg.textContent = teks;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

// Simpan & Muat Data
function simpanData() {
  localStorage.setItem("vapiKoin", koin);
  localStorage.setItem("vapiXP", xp);
}

function muatData() {
  koin = parseInt(localStorage.getItem("vapiKoin")) || 0;
  xp = parseInt(localStorage.getItem("vapiXP")) || 0;
  updateKoin();
  updateXP();
}

document.addEventListener("DOMContentLoaded", muatData);
