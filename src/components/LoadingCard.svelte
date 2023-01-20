<script lang="ts">
	// @ts-expect-error
	import defaultImg from '../assets/default.webp';
</script>

<article
	class="bg-zinc-800 grid grid-rows-2 grid-cols-1 w-56 h-64 rounded shadow border-zinc-700 border cursor-pointer"
>
	<div class="h-full w-full bg-cover rounded-t" style={`background-image: url(${defaultImg})`} />
	<div class="px-4 py-1">
		<div class="w-36 h-6 bg-zinc-500 animate-pulse rounded my-2" />
	</div>
</article>
