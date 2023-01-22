const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	onFocusChange: (callback) => {
		ipcRenderer.on('focus', (e, focus) => {
			callback(focus);
		});
	},

	toBase64: (value) => ipcRenderer.invoke('tobase64', value),

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
		getActive: () => ipcRenderer.invoke('user:getActive'),
		setActive: (id) => ipcRenderer.send('user:setActive', id),
		onActive: (callback) => ipcRenderer.on('user:onActive', callback)
	},

	skin: {
		start: (id) => ipcRenderer.send('skin:start', id),
		cancel: () => ipcRenderer.send('skin:cancel'),
		upload: () => ipcRenderer.send('skin:upload'),
		file: (callback) => ipcRenderer.on('skin:file', callback),
		confirm: (slim) => ipcRenderer.send('skin:confirm', slim),
		refetch: (callback) => ipcRenderer.on('skin:refetch', callback)
	},

	contextmenu: {
		user: (id) => ipcRenderer.send('contextmenu:user', id)
	}
});
