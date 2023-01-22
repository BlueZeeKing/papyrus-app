import { BrowserWindow, ipcMain } from 'electron';
import { addAccount } from './papyrus/src/auth/auth';
import { loadProfiles } from './papyrus/src/auth/persist';
import type { Storage } from './storage';

export class Users {
	active: string | undefined;
	storage: Storage;

	constructor(storage: Storage) {
		this.storage = storage;
		this.active = storage.getItem('user:active') as string;
	}

	setActive(id: string) {
		this.active = id;
		this.storage.setItem('user:active', id);
		BrowserWindow.getAllWindows().forEach((window) => window.webContents.send('user:onActive', id));
	}

	remove(id: string) {
		this.active = id;
		this.storage.setItem('user:active', id);
		BrowserWindow.getAllWindows().forEach((window) => window.webContents.send('user:onActive', id));
	}

	addListeners() {
		ipcMain.handle('user:get', () => {
			return loadProfiles();
		});

		ipcMain.handle('user:add', async () => {
			return await addAccount();
		});

		ipcMain.handle('user:getActive', () => {
			return this.active;
		});

		ipcMain.on('user:setActive', (e, id) => this.setActive(id));
	}
}
