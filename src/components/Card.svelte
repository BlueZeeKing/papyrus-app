<script lang="ts">
	// @ts-expect-error
	import defaultImg from '../assets/default.webp';

	export let image: string | undefined = undefined;
	export let name: string;
	export let desc: string | undefined = undefined;
</script>

<article
	class="bg-zinc-800 grid grid-rows-2 grid-cols-1 w-56 h-64 rounded shadow border-zinc-700 border cursor-pointer"
>
	<div
		class="h-full w-full bg-cover rounded-t bg-center"
		style={`background-image: url(${image != undefined ? image : defaultImg})`}
	/>
	<div class="px-4 py-1">
		<h3 class="text-md font-bold text-zinc-100 py-2">{name}</h3>
		{#if desc != undefined}
			<p class="text-zinc-400 pl-1 text-sm">{desc}</p>
		{/if}
	</div>
</article>
