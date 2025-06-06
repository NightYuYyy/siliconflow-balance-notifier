// utils/logger.js
import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'logs/balance.log');

export function logBalance(balance, isSuppressed = false) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} | Balance: ${balance} | Notification: ${isSuppressed ? 'Suppressed' : 'Sent'}\n`;
  
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  fs.appendFileSync(LOG_FILE, logEntry, 'utf8');
}
