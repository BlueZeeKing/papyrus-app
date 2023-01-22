import { ipcMain } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export class Storage {
	timeout: undefined | NodeJS.Timeout = undefined;
	storage: { [key: string]: unknown } = {};
	storagePath: string;

	constructor(path: string) {
		this.storagePath = resolve(path, 'storage.json');
		this.loadStorage();
	}

	async loadStorage() {
		let fileData: string;

		try {
			fileData = readFileSync(this.storagePath, { encoding: 'utf-8' });
		} catch {
			fileData = '{}';
		}

		this.storage = JSON.parse(fileData);
	}

	updateStorage() {
		if (this.timeout != undefined) {
			clearTimeout(this.timeout);
		}

		this.timeout = setTimeout(() => {
			writeFileSync(this.storagePath, JSON.stringify(this.storage), { encoding: 'utf-8' });
			this.timeout = undefined;
		}, 1000);
	}

	getItem<T>(key: string): T {
		return this.storage[key] as T;
	}

	setItem(key: string, value: unknown) {
		this.storage[key] = value;
		this.updateStorage();
	}

	addListeners() {
		ipcMain.handle('storage:get', (e, key: string) => this.getItem(key));
		ipcMain.handle('storage:set', (e, key: string, value: unknown) => this.setItem(key, value));
	}
}
