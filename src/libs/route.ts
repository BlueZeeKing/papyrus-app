import { writable } from 'svelte/store';

export type Route = 'user' | 'overview';

export const route = writable<Route>('overview');

window.electron.getRoute().then((string) => route.set(string as Route));
