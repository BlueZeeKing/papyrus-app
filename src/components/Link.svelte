<script lang="ts">
	import { route, type Route } from '../libs/route';
	import { focus } from '../libs/focus';

	export let target: Route;

	const handleContext = (e: MouseEvent) => {
		window.electron.contextmenu.route(target);
	};

	const redirect = () => {
		route.set(target);
	};
</script>

<button
	on:contextmenu|preventDefault={handleContext}
	on:click={redirect}
	role="link"
	class="text-zinc-200 active:text-zinc-100 text-left rounded p-2 py-1 transition duration-200 bg-opacity-75"
	class:bg-zinc-600={$route == target && $focus}
	class:bg-zinc-700={$route == target && !$focus}
>
	<slot />
</button>
