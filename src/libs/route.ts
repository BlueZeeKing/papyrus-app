import { readable } from 'svelte/store';

export type Route = 'user' | 'overview';

export const route = readable<Route>('overview', (set) => {
	window.electron.route.onChange((newRoute) => set(newRoute as Route));
});
