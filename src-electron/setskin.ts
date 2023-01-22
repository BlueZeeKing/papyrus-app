import axios from 'axios';
import { app, BrowserWindow, dialog, ipcMain, type IpcMainEvent } from 'electron';
import { readFile } from 'fs/promises';
import { basename, join } from 'path';
import { addAccount, ensureReady } from './papyrus/src/auth/auth';
import { loadProfiles, loadSingleProfile } from './papyrus/src/auth/persist';
import type { Storage } from './storage';
import FormData from 'form-data';
import { Blob } from 'buffer';
import { createReadStream } from 'fs';

export class SkinSetter {
	storagePath: string;
	window: BrowserWindow | undefined;
	uuid: string | undefined;
	filePath: string | undefined;

	constructor(path: string) {
		this.storagePath = path;
	}

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

			await ensureReady(this.storagePath, this.uuid);
			const data = new FormData();

			data.append('variant', slim ? 'slim' : 'classic');
			data.append('file', createReadStream(this.filePath));

			const res = await axios.post(
				'https://api.minecraftservices.com/minecraft/profile/skins',
				data,
				{
					headers: {
						Authorization: `Bearer ${
							(
								await loadSingleProfile(this.storagePath, this.uuid as string)
							)?.token
						}`,
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
