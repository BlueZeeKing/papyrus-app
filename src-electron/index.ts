import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		titleBarStyle: 'hiddenInset',
		backgroundColor: '#27272a',
		webPreferences: {
			preload: join(__dirname, 'src-electron/preload.cjs')
		}
	});

	win.loadURL('http://localhost:5173/');

	win.on('focus', () => {
		win.webContents.send('focus', true);
	});

	win.on('blur', () => {
		win.webContents.send('focus', false);
	});
};

async function main() {
	await app.whenReady();

	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});
}

main();
