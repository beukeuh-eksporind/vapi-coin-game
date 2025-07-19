// === wallet.js: Sistem Dompet & Riwayat VapiCoin ===

const Wallet = (() => {
  const KEY = "vapiWallet";

  function getData() {
    return JSON.parse(localStorage.getItem(KEY)) || {
      coins: 0,
      lastWithdraw: null,
      history: []
    };
  }

  function saveData(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function getCoins() {
    return getData().coins;
  }

  function addCoins(amount, source = "reward") {
    const data = getData();
    data.coins += amount;
    data.history.push({ type: "add", source, amount, time: Date.now() });
    saveData(data);
  }

  function deductCoins(amount, reason = "withdraw") {
    const data = getData();
    if (data.coins >= amount) {
      data.coins -= amount;
      data.lastWithdraw = Date.now();
      data.history.push({ type: "deduct", reason, amount, time: Date.now() });
      saveData(data);
      return true;
    }
    return false;
  }

  function getHistory(limit = 10) {
    const data = getData();
    return data.history.slice(-limit).reverse();
  }

  function canWithdraw(limitPerDay = 1) {
    const data = getData();
    if (!data.lastWithdraw) return true;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    return now - data.lastWithdraw >= oneDay * limitPerDay;
  }

  return {
    getCoins,
    addCoins,
    deductCoins,
    getHistory,
    canWithdraw
  };
})();
