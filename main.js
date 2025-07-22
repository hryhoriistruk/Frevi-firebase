const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.ELECTRON_IS_DEV === '1';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        },
        icon: path.join(__dirname, 'assets/icon.ico'), // опціонально
        titleBarStyle: 'default',
        show: false // Не показуємо вікно поки не завантажиться
    });

    // Показуємо вікно коли контент завантажиться
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    if (isDev) {
        // В режимі розробки підключаємось до Next.js dev server
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        // В продакшені завантажуємо статичну збірку з папки 'out'
        const startUrl = path.join(__dirname, 'out/index.html');
        mainWindow.loadFile(startUrl);
    }

    // Обробка помилок завантаження
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Failed to load:', errorDescription);
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Забороняємо навігацію до зовнішніх сайтів
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (navigationEvent, navigationUrl) => {
        navigationEvent.preventDefault();
    });
});