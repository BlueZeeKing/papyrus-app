import { BrowserWindow, ipcMain, Menu, MenuItem, type MenuItemConstructorOptions } from 'electron';
import type { SkinSetter } from './setskin';
import type { Users } from './users';

export class ContextMenu {
	skin: SkinSetter;
	user: Users;

	constructor(skin: SkinSetter, user: Users) {
		this.skin = skin;
		this.user = user;
	}

	addListeners() {
		ipcMain.on('contextmenu:user', (e, id: string) => {
			const template: (MenuItemConstructorOptions | MenuItem)[] = [
				{
					label: 'Change Skin',
					click: () =>
						this.skin.setSkin(BrowserWindow.fromWebContents(e.sender) as BrowserWindow, id)
				},
				{
					label: 'Remove'
				},
				{
					label: 'Set Active',
					click: () => this.user.setActive(id)
				},
				{
					type: 'separator'
				},
				{
					label: 'Force refresh'
				}
			];

			Menu.buildFromTemplate(template).popup({
				window: BrowserWindow.fromWebContents(e.sender) as BrowserWindow
			});
		});
	}
}
