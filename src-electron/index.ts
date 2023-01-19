import { app, BrowserWindow, ipcMain } from 'electron';
import { readFile } from 'fs/promises';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

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
	let timeout: undefined | NodeJS.Timeout = undefined;

	function updateStorage() {
		if (timeout != undefined) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			writeFileSync(storagePath, JSON.stringify(storage), { encoding: 'utf-8' });
			timeout = undefined;
		}, 1000);
	}

	const storagePath = resolve(app.getPath('appData'), 'papyrus', 'storage.json');

	if (!existsSync(resolve(app.getPath('appData'), 'papyrus'))) {
		mkdirSync(resolve(app.getPath('appData'), 'papyrus'), { recursive: true });
	}

	let fileData: string;

	try {
		fileData = await readFile(storagePath, { encoding: 'utf-8' });
	} catch {
		fileData = '{}';
	}

	const storage: { [key: string]: unknown } = JSON.parse(fileData);

	await app.whenReady();

	ipcMain.handle('storage:get', (e, key: string) => storage[key]);
	ipcMain.handle('storage:set', (e, key: string, value: unknown) => {
		storage[key] = value;
		updateStorage();
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
