<script lang="ts">
	import Button from './Button.svelte';
	// @ts-expect-error
	import Trash from '../assets/icons/icon-trash.svg';
	import IconButton from './IconButton.svelte';
	import { active } from '../libs/user';

	export let username: string;
	export let uuid: string;

	let activeUser = false;

	active.subscribe((value) => {
		activeUser = value == uuid;
	});
</script>

<div
	class="flex p-4 !bg-opacity-50 even:bg-zinc-800"
	role="listitem"
	on:contextmenu|preventDefault={() => window.electron.contextmenu.user(uuid)}
>
	<img
		src={`https://mc-heads.net/avatar/${uuid}`}
		alt="Minecraft Avatar"
		class="h-16 w-16 rounded shadow"
	/>
	<h2 class="text my-auto mx-3 text-md text-zinc-100">{username}</h2>
	<div class="flex-grow" />
	<Button on:click={() => window.electron.skin.start(uuid)}>Change Skin</Button>
	<IconButton state="error">
		<Trash slot="icon" class="h-6" />
		<span slot="text">Remove</span>
	</IconButton>

	<Button state="success" disabled={activeUser} on:click={() => active.set(uuid)}>Set active</Button
	>
</div>
