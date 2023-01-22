import { app, BrowserWindow, ipcMain } from 'electron';
import { existsSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { ContextMenu } from './contextmenu';
import { setPath } from './papyrus/src/main';
import { getRoute } from './route';
import { SkinSetter } from './setskin';
import { Storage } from './storage';
import { Users } from './users';

export const createWindow = (wait = false): BrowserWindow => {
	let size = storage.getItem<[number, number]>('size');

	if (size == undefined) {
		size = [800, 600];
	}

	const win = new BrowserWindow({
		width: size[0],
		height: size[1],
		titleBarStyle: 'hiddenInset',
		backgroundColor: '#27272a',
		webPreferences: {
			preload: join(__dirname, 'src-electron/preload.cjs')
		}
	});

	if (!wait) {
		win.loadURL('http://localhost:5173/');
	}

	win.on('focus', () => {
		win.webContents.send('focus', true);
	});

	win.on('blur', () => {
		win.webContents.send('focus', false);
	});

	win.on('resize', () => {
		storage.setItem('size', win.getSize());
	});

	return win;
};

export const dataPath = resolve(app.getPath('appData'), 'papyrus');

export const storage = new Storage(dataPath);
export const users = new Users();
export const skin = new SkinSetter();
export const contextmenu = new ContextMenu();

async function main() {
	if (!existsSync(dataPath)) {
		mkdirSync(dataPath, { recursive: true });
	}

	setPath(dataPath);

	await app.whenReady();

	storage.addListeners();
	users.addListeners();
	skin.addListeners();
	contextmenu.addListeners();

	ipcMain.handle('tobase64', (e, buffer: ArrayBuffer) => {
		return Buffer.from(buffer).toString('base64');
	});

	ipcMain.handle('getRoute', (e) =>
		getRoute((BrowserWindow.fromWebContents(e.sender) as BrowserWindow).id)
	);

	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});
}

main();
