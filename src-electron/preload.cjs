const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	onFocusChange: (callback) => {
		ipcRenderer.on('focus', (e, focus) => {
			callback(focus);
		});
	}
});
