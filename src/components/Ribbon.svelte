<script lang="ts">
	// @ts-expect-error
	import User from '../assets/icons/icon-user.svg';
	// @ts-expect-error
	import Home from '../assets/icons/icon-home.svg';
	import Icon from './Icon.svelte';

	export let open: boolean;
</script>

<aside
	class={`border-r border-zinc-700 ${
		open ? 'bg-zinc-800' : 'bg-zinc-900'
	} transition duration-200 ribbon p-1 flex-col flex gap-4 pt-4`}
>
	<Icon>
		<User />
	</Icon>
	<Icon>
		<Home />
	</Icon>
</aside>

<style lang="postcss">
	.ribbon {
		grid-area: ribbon;
	}

	.primary {
		@apply fill-zinc-100;
	}
</style>
