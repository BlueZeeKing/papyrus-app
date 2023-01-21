import { readable } from 'svelte/store';

export const focus = readable(true, (set) => window.electron.onFocusChange((a: boolean) => set(a)));
