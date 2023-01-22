<script lang="ts">
	import Button from './Button.svelte';
	import type { State } from '../libs/types';

	export let state: State = 'outline';
</script>

<Button {state} on:click>
	<div class="flex">
		<div class="h-6 -ml-2 pr-2">
			<slot name="icon" />
		</div>
		<slot name="text" />
	</div>
</Button>
