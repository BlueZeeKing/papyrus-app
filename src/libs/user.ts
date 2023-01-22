import { writable } from 'svelte/store';

export const active = writable<string | undefined>(undefined);

window.electron.users.getActive().then((value) => active.set(value));

active.subscribe((value) => {
	if (value != undefined) {
		window.electron.users.setActive(value);
	}
});
