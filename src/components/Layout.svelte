<script lang="ts">
	import { onMount } from 'svelte';
	import Ribbon from './Ribbon.svelte';
	let focus = true;

	onMount(async () => {
		window.electron.onFocusChange((a: boolean) => (focus = a));

		window.addEventListener('mousemove', (e) => {
			e.preventDefault();
			if (clicked == true) {
				width = e.clientX - sidebar.getBoundingClientRect().left;

				window.electron.storage.set('sidebar-width', width);

				if (width > 0) {
					open = true;
				}
			}
		});

		window.addEventListener('mouseup', () => {
			clicked = false;
			open = width > 0;
		});

		let res = await window.electron.storage.get('sidebar-width');

		if (res != undefined) {
			width = res as number;
			open = width > 0;
		}
	});

	let clicked = false;

	let width = 250;
	let open = true;

	let sidebar: HTMLElement;
</script>

<div
	class="w-screen h-screen bg-zinc-900 grid layout-grid"
	style={`grid-template-columns: 40px ${Math.max(width, 0)}px calc(calc(100vw - 40px) - ${Math.max(
		width,
		0
	)}px);`}
>
	<header
		class={`${
			focus ? 'bg-[#37373C]' : 'bg-zinc-800 border-b'
		} border-zinc-700 transition duration-100 top`}
		style="-webkit-app-region: drag"
	/>
	<Ribbon {open} />
	<aside bind:this={sidebar} class="bg-zinc-800 relative side">
		<div
			on:mousedown={(e) => (clicked = true)}
			class="absolute h-full bg-fuchsia-500 bg-opacity-0 hover:bg-opacity-100 w-[3px] right-[-1px] transition duration-150 cursor-col-resize top-0"
		/>
	</aside>
	<div class="p-2 main overflow-y-auto">
		<slot />
	</div>
</div>

<style>
	.layout-grid {
		grid-template-areas: 'top top top' 'ribbon side main';
		grid-template-rows: 36px 1fr;
		grid-template-columns: 40px 250px 1fr;
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
