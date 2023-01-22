import axios from 'axios';
import { BrowserWindow, dialog, ipcMain } from 'electron';
import { basename, join } from 'path';
import { ensureReady } from './papyrus/src/auth/auth';
import { loadSingleProfile } from './papyrus/src/auth/persist';
import FormData from 'form-data';
import { createReadStream } from 'fs';

export class SkinSetter {
	window: BrowserWindow | undefined;
	uuid: string | undefined;
	filePath: string | undefined;

	async setSkin(window: BrowserWindow, id: string) {
		this.uuid = id;

		this.window = new BrowserWindow({
			parent: window,
			modal: true,
			width: 500,
			height: 300,
			titleBarStyle: 'hidden',
			webPreferences: {
				preload: join(__dirname, 'src-electron/preload.cjs')
			},
			backgroundColor: '#18181b'
		});

		this.window.loadURL('http://localhost:5173/skin/index.html');
	}

	addListeners() {
		ipcMain.on('skin:start', (e, id: string) => {
			this.setSkin(BrowserWindow.fromWebContents(e.sender) as BrowserWindow, id);
		});

		ipcMain.on('skin:cancel', async () => {
			this.window?.close();
		});

		ipcMain.on('skin:upload', async () => {
			const res = await dialog.showOpenDialog({});

			if (!res.canceled) {
				this.filePath = res.filePaths[0];
				this.window?.webContents.send('skin:file', basename(res.filePaths[0]));
			}
		});

		ipcMain.on('skin:confirm', async (e, slim: boolean) => {
			if (this.uuid == undefined || this.filePath == undefined) {
				return;
			}

			await ensureReady(this.uuid);
			const data = new FormData();

			data.append('variant', slim ? 'slim' : 'classic');
			data.append('file', createReadStream(this.filePath));

			const res = await axios.post(
				'https://api.minecraftservices.com/minecraft/profile/skins',
				data,
				{
					headers: {
						Authorization: `Bearer ${(await loadSingleProfile(this.uuid as string))?.token}`,
						...data.getHeaders()
					}
				}
			);

			BrowserWindow.getAllWindows().forEach((window) => {
				window.webContents.send('skin:refetch', this.uuid);
			});
			this.window?.close();

			this.uuid = undefined;
			this.window = undefined;
			this.filePath = undefined;
		});
	}
}
