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
	}
});
