const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

let tray = null;

function createNotification(data) {
    const notifyWin = new BrowserWindow({
        width: 320,
        height: 120,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        skipTaskbar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    notifyWin.loadFile('notifier.html');

    notifyWin.once('ready-to-show', () => {
        notifyWin.webContents.send('notify-data', data);
    });

    setTimeout(() => {
        if (!notifyWin.isDestroyed()) notifyWin.close();
    }, 5000); // 自动关闭通知
}

app.whenReady().then(() => {
    tray = new Tray(path.join(__dirname, 'assets/icon.png')); // 可自定义图标
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '发送通知', click: () => createNotification({
                title: '你有新的提醒',
                message: '这是一个来自后台的通知',
                actions: ['查看详情', '忽略']
            })
        },
        { label: '退出', role: 'quit' }
    ]);
    tray.setToolTip('后台通知系统');
    tray.setContextMenu(contextMenu);
});

ipcMain.on('notify-click', (event, label) => {
    console.log('用户点击了按钮:', label);
    // 这里可以执行相关逻辑，比如打开窗口、调用 API 等
});
