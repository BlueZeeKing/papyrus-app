const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	onFocusChange: (callback) => {
		ipcRenderer.on('focus', (e, focus) => {
			callback(focus);
		});
	},
	storage: {
		get: (key) => ipcRenderer.invoke('storage:get', key),
		set: (key, value) => ipcRenderer.invoke('storage:set', key, value)
	},
	route: {
		change: (route) => ipcRenderer.send('changeRoute', route),
		onChange: (callback) => ipcRenderer.on('changeRoute', (e, data) => callback(data)),
		openContextMenu: (route) => ipcRenderer.send('openRouteContext', route)
	},
	users: {
		get: () => ipcRenderer.invoke('user:get'),
		add: () => ipcRenderer.invoke('user:add'),
		getActive: (id) => ipcRenderer.invoke('user:getActive'),
		setActive: (id) => ipcRenderer.send('user:setActive', id)
	}
});
