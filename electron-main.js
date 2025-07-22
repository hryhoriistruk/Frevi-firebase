const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false // Тимчасово для локальних файлів
        }
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        // Завантаження з папки out
        mainWindow.loadFile(path.join(__dirname, 'out', 'index.html'));
    }

    // Відкрити DevTools для діагностики
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});