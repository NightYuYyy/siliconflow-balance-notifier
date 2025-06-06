// index.js
import 'dotenv/config' // 必须在所有import之前执行！
import { NotificationManager } from './services/notificationManager.js';
import { fetchBalance } from './services/apiService.js';
const notificationManager = new NotificationManager();
const POLLING_INTERVAL = 300; // 5分钟

async function checkBalance() {
  try {
    const balance = await fetchBalance();
    if (balance !== null && !notificationManager.isSuppressed()) {
      notificationManager.show(balance);
    }
  } catch (error) {
    console.error('余额检查失败:', error.message);
  }
}

function startPolling() {
  checkBalance();
  setInterval(checkBalance, POLLING_INTERVAL * 1000);
}

startPolling();
