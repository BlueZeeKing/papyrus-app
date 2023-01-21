<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from './Sidebar.svelte';
	import { focus } from '../libs/focus';

	onMount(async () => {
		window.addEventListener('mousemove', (e) => {
			e.preventDefault();
			if (clicked == true) {
				width = Math.min(Math.max(e.clientX, 20), window.innerWidth);

				window.electron.storage.set('sidebar-width', width);
			}
		});

		window.addEventListener('mouseup', () => {
			clicked = false;
		});

		let res = await window.electron.storage.get('sidebar-width');

		if (res != undefined) {
			width = res as number;
		}
	});

	let clicked = false;

	let width = 250;
</script>

<div
	class="w-screen h-screen bg-zinc-900 grid layout-grid"
	style={`grid-template-columns: ${Math.max(width, 0)}px calc(100vw - ${Math.max(width, 0)}px);`}
>
	<header
		class="bg-[#37373C] border-zinc-700 transition duration-100 top"
		class:!bg-zinc-800={!$focus}
		class:border-b={!$focus}
		style="-webkit-app-region: drag"
	/>
	<Sidebar onClick={() => (clicked = true)} />
	<div
		class="top-0 fixed border-r border-zinc-700 h-screen"
		class:hidden={$focus}
		style:left={`${width}px`}
	/>
	<div class="p-2 main overflow-y-auto">
		<slot />
	</div>
</div>

<style>
	.layout-grid {
		grid-template-areas: 'top top' 'side main';
		grid-template-rows: 36px 1fr;
		grid-template-columns: 250px 1fr;
	}

	.top {
		grid-area: top;
	}

	.side {
		grid-area: side;
	}

	.main {
		grid-area: main;
	}
</style>
