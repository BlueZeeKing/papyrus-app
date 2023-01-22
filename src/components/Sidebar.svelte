<script lang="ts">
	import Link from './Link.svelte';

	export let onClick: (e: MouseEvent) => void;
</script>

<aside class="bg-zinc-800 relative side flex flex-col gap-3 p-2">
	<Link target="overview">Overview</Link>
	<Link target="user">Users</Link>
	<div
		on:mousedown={onClick}
		class="absolute h-full bg-fuchsia-500 bg-opacity-0 hover:bg-opacity-100 w-[3px] right-[-1px] transition duration-150 cursor-col-resize top-0"
	/>
</aside>

<style>
	.side {
		grid-area: side;
	}
</style>
