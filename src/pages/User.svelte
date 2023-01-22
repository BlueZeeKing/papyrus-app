<script lang="ts">
	import UserRow from '../components/UserRow.svelte';
	import Button from '../components/Button.svelte';

	let promise = window.electron.users.get();
</script>

<Button state="primary" on:click={() => (promise = window.electron.users.add())}>Add</Button>

<hr class="m-4 border-zinc-500" />

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
