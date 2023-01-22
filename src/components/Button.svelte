<script lang="ts">
	import type { State } from '../libs/types';

	export let state: State = 'outline';
	export let disabled = false;

	export let extraClasses = '';

	const getStyle = (disabled: boolean, state: State) => {
		if (disabled) {
			return 'bg-zinc-700 cursor-not-allowed !text-zinc-400';
		}

		switch (state) {
			case 'primary':
				return 'bg-indigo-500 hover:bg-indigo-600 outline-[#818df89b]';
			case 'error':
				return 'bg-red-600 hover:bg-red-700 outline-[#ef44449b]';
			case 'outline':
				return 'bg-zinc-600 hover:bg-zinc-700 outline-[#a1a1aa9b]';
			case 'success':
				return 'bg-emerald-600 hover:bg-emerald-700 outline-[#34d3999b]';
		}
	};

	$: classes = getStyle(disabled, state);
</script>

<button
	class={`${classes} ${extraClasses} px-8 py-2 text-white m-4 rounded transition shadow outline active:outline-[3px] outline-0`}
	on:click
	{disabled}
>
	<slot />
</button>
