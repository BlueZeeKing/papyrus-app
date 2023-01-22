<script lang="ts">
	import Button from '../components/Button.svelte';
	import IconButton from '../components/IconButton.svelte';
	// @ts-expect-error
	import Upload from '../assets/icons/icon-inbox-upload.svg';

	let slim = false;
	let name = '';

	window.electron.skin.file((e, newName) => {
		name = newName;
	});
</script>

<div class="h-screen w-screen bg-zinc-900 p-4 grid grid-cols-2 place-items-center">
	<div>
		<IconButton state="primary" on:click={() => window.electron.skin.upload()}
			><span slot="text">Upload</span> <Upload class="h-6" slot="icon" /></IconButton
		>
		<p>{name}</p>
	</div>
	<div class="relative w-52">
		<div role="radiogroup" class="flex gap-4 w-52 bg-zinc-600 rounded-lg">
			<div
				class="h-full w-24 bg-indigo-500 absolute rounded-lg transition-all left-0"
				class:translate-x-28={!slim}
			/>
			<button
				class="px-4 py-2 relative w-24 text-center rounded-lg"
				class:hover:bg-zinc-700={!slim}
				on:click={() => (slim = true)}
			>
				Slim
			</button>
			<button
				class="px-4 py-2 relative w-24 text-center rounded-lg"
				class:hover:bg-zinc-700={slim}
				on:click={() => (slim = false)}
			>
				Classic
			</button>
		</div>
	</div>
	<div class="flex absolute bottom-2 right-2">
		<Button state="error" extraClasses="!m-1 mr-4" on:click={() => window.electron.skin.cancel()}
			>Cancel</Button
		>
		<Button state="success" extraClasses="!m-1" on:click={() => window.electron.skin.confirm(slim)}
			>Continue</Button
		>
	</div>
</div>
