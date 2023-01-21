// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		electron: {
			onFocusChange: (callback: (focused: boolean) => void) => void;
			storage: {
				get: (key: string) => unknown;
				set: (key: string, value: unknown) => void;
			};
			route: {
				change: (route: string) => void;
				onChange: (callback: (route: string) => void) => void;
				openContextMenu: (route: string) => void;
			};
		};
	}
}

/// <reference types="svelte" />
/// <reference types="vite/client" />

export {};
