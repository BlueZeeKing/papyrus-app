import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import svelteSVG from 'vite-plugin-svelte-svg';
import { resolve } from 'path';
import { cwd } from 'process';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(cwd(), 'index.html'),
				skin: resolve(cwd(), 'skin/index.html')
			}
		}
	},
	plugins: [
		svelte(),
		svelteSVG({
			requireSuffix: false,
			svgoConfig: {}
		})
	]
});
