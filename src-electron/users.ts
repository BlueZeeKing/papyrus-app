import { BrowserWindow, dialog, ipcMain } from 'electron';
import { storage } from './index';
import { addAccount } from './papyrus/src/auth/auth';
import { loadProfiles, removeProfile } from './papyrus/src/auth/persist';

export class Users {
	active: string | undefined;

	constructor() {
		this.active = storage.getItem<string>('user:active');
	}

	setActive(id: string) {
		this.active = id;
		storage.setItem('user:active', id);
		BrowserWindow.getAllWindows().forEach((window) => window.webContents.send('user:onActive', id));
	}

	async remove(id: string, win: BrowserWindow) {
		const res = await dialog.showMessageBox(win, {
			message: 'Are you sure you want to delete this account?',
			type: 'warning',
			buttons: ['OK', 'Cancel'],
			defaultId: 0,
			cancelId: 1
		});
		if (res.response == 0) {
			await removeProfile(id);
			BrowserWindow.getAllWindows().forEach((window) =>
				window.webContents.send('user:onRemove', id)
			);
		}
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

		ipcMain.on('user:remove', (e, id) =>
			this.remove(id, BrowserWindow.fromWebContents(e.sender) as BrowserWindow)
		);

		ipcMain.on('user:setActive', (e, id) => this.setActive(id));
	}
}
