<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import LoadingCard from './LoadingCard.svelte';

	export let cards: {
		image?: string;
		name: string;
		desc?: string;
	}[];

	export let header: string | undefined = undefined;
	export let load = false;
</script>

<div class="">
	{#if header != undefined}
		<div class="flex px-4 pt-2">
			<hr class="w-12 m-auto border-zinc-600" />
			<h2 class="p-4 text-zinc-100 text-xl">{header}</h2>
			<hr class="flex-grow m-auto border-zinc-600" />
		</div>
	{/if}
	{#if load}
		<div class="max-w-full overflow-x-auto hide-scroll-bar">
			<div class="px-4 gap-4 grid grid-flow-col justify-start">
				{#each [1, 2, 3] as i}
					<LoadingCard />
				{/each}
			</div>
		</div>
	{:else}
		<div class="max-w-full overflow-x-auto hide-scroll-bar">
			<div class="px-4 gap-4 grid grid-flow-col justify-start">
				{#each cards as { name, image, desc }}
					<Card {name} {image} {desc} />
				{/each}
			</div>
		</div>
	{/if}
</div>
