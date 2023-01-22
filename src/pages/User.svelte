<script lang="ts">
	import UserRow from '../components/UserRow.svelte';
	import Button from '../components/Button.svelte';

	let promise = window.electron.users.get();

	window.electron.users.onRemove(
		async () => (promise = Promise.resolve(await window.electron.users.get()))
	);
</script>

<Button
	state="primary"
	extraClasses="fixed bottom-0 right-0"
	on:click={async () => (promise = Promise.resolve(await window.electron.users.add()))}>Add</Button
>

<div class="flex flex-col" role="list">
	{#await promise}
		<p>Loading...</p>
	{:then users}
		{#each users as { uuid, username }}
			<UserRow {uuid} {username} />
		{/each}
	{/await}
</div>

<style>
</style>
