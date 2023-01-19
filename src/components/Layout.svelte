<script lang="ts">
	import { onMount } from 'svelte';
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

<div class="w-screen h-screen bg-zinc-900">
	<header
		class={`h-[36px] ${
			focus ? 'bg-[#37373C]' : 'bg-zinc-800 border-b'
		} border-zinc-700 transition duration-100`}
		style="-webkit-app-region: drag"
	/>
	<div class="flex h-[calc(100vh-36px)]">
		<aside
			class={`w-10 border-r border-zinc-700 ${
				open ? 'bg-zinc-800' : 'bg-zinc-900'
			} transition duration-200`}
		/>
		<aside bind:this={sidebar} style={`width: ${width}px`} class="bg-zinc-800 relative">
			<div
				on:mousedown={(e) => (clicked = true)}
				class="absolute h-full bg-fuchsia-500 bg-opacity-0 hover:bg-opacity-100 w-[3px] right-[-1px] transition duration-150 cursor-col-resize"
			/>
		</aside>
		<div class="flex-grow p-2">
			<slot />
		</div>
	</div>
</div>
