<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';

	export let cards: {
		image?: string;
		name: string;
		desc?: string;
	}[];

	export let header: string | undefined = undefined;
</script>

<div>
	{#if header != undefined}
		<div class="flex px-4">
			<hr class="w-12 m-auto border-zinc-600" />
			<h2 class="p-4 text-zinc-100">{header}</h2>
			<hr class="flex-grow m-auto border-zinc-600" />
		</div>
	{/if}
	<div class="w-full overflow-scroll">
		<div class="flex px-4">
			{#each cards as card}
				<Card name={card.name} image={card.image} desc={card.desc} />
			{/each}
		</div>
	</div>
</div>
