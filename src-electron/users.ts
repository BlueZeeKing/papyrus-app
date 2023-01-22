import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { join } from 'path';
import { addAccount, ensureReady } from './papyrus/src/auth/auth';
import { loadProfiles } from './papyrus/src/auth/persist';
import type { Storage } from './storage';

export class Users {
	storagePath: string;
	active: string | undefined;
	storage: Storage;

	constructor(path: string, storage: Storage) {
		this.storagePath = path;
		this.storage = storage;
		this.active = storage.getItem('user:active') as string;
	}

	setActive(id: string) {
		this.active = id;
		this.storage.setItem('user:active', id);
		BrowserWindow.getAllWindows().forEach((window) => window.webContents.send('user:onActive', id));
	}

	addListeners() {
		ipcMain.handle('user:get', () => {
			return loadProfiles(this.storagePath);
		});

		ipcMain.handle('user:add', async () => {
			return await addAccount(this.storagePath);
		});

		ipcMain.handle('user:getActive', () => {
			return this.active;
		});

		ipcMain.on('user:setActive', (e, id) => this.setActive(id));
	}
}
