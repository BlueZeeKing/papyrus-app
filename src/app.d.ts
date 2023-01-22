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
			toBase64: (a: ArrayBuffer) => Promise<string>;

			storage: {
				get: (key: string) => unknown;
				set: (key: string, value: unknown) => void;
			};

			route: {
				openContextMenu: (route: string) => void;
				change: (route: string) => void;
				onChange: (callback: (e: unknown, route: string) => void) => void;
			};

			users: {
				get: () => Promise<LoginInfo[]>;
				add: () => Promise<LoginInfo[]>;
				getActive: () => Promise<string>;
				setActive: (id: string) => void;
				onActive: (callback: (e: unknown, id: string) => void) => void;
				onRemove: (callback: (e: unknown) => void) => void;
				remove: (id: string) => void;
			};

			skin: {
				start: (id: string) => void;
				cancel: () => void;
				upload: () => void;
				file: (callback: (e: unknown, name: string) => void) => void;
				confirm: (slim: boolean) => void;
				refetch: (callback: (e: unknown, id: string) => void) => void;
			};

			contextmenu: {
				user: (id: string) => void;
			};
		};
	}
}

/// <reference types="svelte" />
/// <reference types="vite/client" />

export {};
