declare global {
	interface Window {
		electron: {
			onFocusChange: (callback: (focused: boolean) => void) => void;
		};
	}
}

export {};
