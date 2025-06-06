# Balance Monitor - 硅基流动余额监控通知工具

![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📌 核心功能
- 定时轮询硅基流动账户余额
- 跨平台桌面通知（支持 macOS/Windows/Linux）
- 智能暂停通知（10分钟/1小时/3小时/当天不再提醒）

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/yourrepo/siliconflow-balance-notifier.git
cd siliconflow-balance-notifier

# 安装依赖
npm install

# 配置环境变量（需替换真实API_KEY）
echo "API_KEY=your_siliconflow_api_key_here" > .env
```

## ⚙️ 环境配置

### `.env` 模板
```ini
API_KEY=siliconflow_sk_test_51H7xxx
BALANCE_CHECK_URL=https://api.siliconflow.com/v1/balance
POLLING_INTERVAL=300  # 轮询间隔(秒)
```

## 📂 项目结构
```
/siliconflow-balance-notifier
├── services/
│   ├── apiService.js    # 支付宝API交互
│   └── notificationManager.js 
├── utils/
│   ├── logger.js        # 日志系统
│   └── retryHandler.js  # 请求重试
└── balanceNotifier.js   # 主入口
```

## 🛠️ 常用命令

| 功能               | 命令                     |
|--------------------|--------------------------|
| 启动监控           | `npm start`              |
| 测试通知           | `npm run test:notify`    |
| 查看日志           | `tail -f logs/balance.log` |

## 🔍 日志示例
```
2023-07-20T14:30:45.000Z | 余额: ¥1280.50 | 状态: 已发送
2023-07-20T14:35:45.000Z | 余额: ¥1280.50 | 状态: 已静默(1小时)
```

## ❓ 常见问题

**Q: 修改通知图标？**
修改 `notificationManager.js` 中的 `icon` 路径

**Q: 通知不显示？**
```bash
# 测试系统通知功能
node test/notificationTest.js
```

📜 License: [MIT](LICENSE)
