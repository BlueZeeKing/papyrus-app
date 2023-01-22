// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { LoginInfo } from '../src-electron/papyrus/src/types/auth';

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

			users: {
				get: () => Promise<LoginInfo[]>;
				add: () => Promise<LoginInfo[]>;
				getActive: () => Promise<string>;
				setActive: (id: string) => void;
			};
		};
	}
}

/// <reference types="svelte" />
/// <reference types="vite/client" />

export {};
