import { ipcMain } from 'electron';
import { writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export class Storage {
	timeout: undefined | NodeJS.Timeout = undefined;
	storage: { [key: string]: unknown } = {};
	storagePath: string;

	constructor(path: string) {
		this.storagePath = resolve(path, 'storage.json');
	}

	async loadStorage() {
		let fileData: string;

		try {
			fileData = await readFile(this.storagePath, { encoding: 'utf-8' });
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

	addListeners() {
		ipcMain.handle('storage:get', (e, key: string) => this.storage[key]);
		ipcMain.handle('storage:set', (e, key: string, value: unknown) => {
			this.storage[key] = value;
			this.updateStorage();
		});
	}
}
