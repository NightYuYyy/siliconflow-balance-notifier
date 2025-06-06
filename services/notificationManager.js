// services/notificationManager.js
import notifier from 'node-notifier';
import { logBalance } from '../utils/logger.js';

export class NotificationManager {
  constructor() {
    this.suppressOptions = {
      '10分钟': 10 * 60 * 1000,
      '1小时': 60 * 60 * 1000,
      '3小时': 3 * 60 * 60 * 1000,
      '今天不再提醒': this.getRemainingToday()
    };
  }

  show(balance) {
    notifier.notify({
      title: '账户余额提醒',
      message: `当前余额：${balance}元\n上次更新：${new Date().toLocaleString()}`,
      actions: Object.keys(this.suppressOptions),
      timeout: 10
    }, (err, response, metadata) => {
      if (metadata?.activationValue) {
        this.handleResponse(metadata.activationValue, balance);
      }
      logBalance(balance, !!metadata?.activationValue);
    });
  }

  handleResponse(option, balance) {
    const suppressTime = this.suppressOptions[option];
    console.log(`用户选择「${option}」暂停通知`);
    this.suppressUntil = Date.now() + suppressTime;
  }
  // 新增方法：检查是否处于静默期
  isSuppressed() {
    return Date.now() < this.suppressUntil;
  }

  getRemainingToday() {
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return endOfDay - now;
  }
}

// services/notificationManager.js 底部添加
export default NotificationManager;
