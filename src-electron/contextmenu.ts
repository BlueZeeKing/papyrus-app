import { BrowserWindow, ipcMain, Menu, MenuItem, type MenuItemConstructorOptions } from 'electron';
import { createWindow, skin, users } from './index';
import type { Route } from '../src/libs/route';
import { setRoute } from './route';

export class ContextMenu {
	addListeners() {
		ipcMain.on('contextmenu:user', (e, id: string) => {
			const template: (MenuItemConstructorOptions | MenuItem)[] = [
				{
					label: 'Change Skin',
					click: () => skin.setSkin(BrowserWindow.fromWebContents(e.sender) as BrowserWindow, id)
				},
				{
					label: 'Remove',
					click: () => users.remove(id, BrowserWindow.fromWebContents(e.sender) as BrowserWindow)
				},
				{
					label: 'Set Active',
					click: () => users.setActive(id)
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

		ipcMain.on('contextmenu:route', (e, route: Route) => {
			const template: (MenuItemConstructorOptions | MenuItem)[] = [
				{
					label: 'Open in new window',
					click: () => {
						const win = createWindow(true);
						setRoute(win.id, route);

						win.loadURL('http://localhost:5173/');
					}
				}
			];

			Menu.buildFromTemplate(template).popup({
				window: BrowserWindow.fromWebContents(e.sender) as BrowserWindow
			});
		});
	}
}
