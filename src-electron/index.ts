import { app, BrowserWindow, ipcMain } from 'electron';
import { existsSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { Storage } from './storage';

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

export const dataPath = resolve(app.getPath('appData'), 'papyrus');

async function main() {
	if (!existsSync(dataPath)) {
		mkdirSync(dataPath, { recursive: true });
	}

	const storage = new Storage(dataPath);

	await app.whenReady();

	storage.addListeners();

	ipcMain.on('changeRoute', (e, route: string) => {
		e.sender.send('changeRoute', route);
	});

	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});
}

main();
