<script lang="ts">
	import CardList from '../components/CardList.svelte';
	import {
		getAllFabricGameVersions,
		getAllVanillaVersions
	} from '../../src-electron/papyrus/src/fetch/versions';
	import dayjs from 'dayjs';

	//@ts-expect-error
	import image from '../assets/fabric.webp';
</script>

<div class="px-4">
	{#await getAllVanillaVersions()}
		<CardList cards={[]} header="Vanilla" load />
	{:then data}
		<CardList
			cards={data.versions
				.filter((version) => version.type == 'release')
				.slice(0, 15)
				.map((version) => ({
					name: version.id,
					desc: `Released on ${dayjs(version.releaseTime).format('MMMM D, YYYY')}`
				}))}
			header="Vanilla"
		/>
	{/await}

	{#await getAllVanillaVersions()}
		<CardList cards={[]} header="Snapshots" load />
	{:then data}
		<CardList
			cards={data.versions
				.filter((version) => version.type == 'snapshot')
				.slice(0, 15)
				.map((version) => ({
					name: version.id,
					desc: `Released on ${dayjs(version.releaseTime).format('MMMM D, YYYY')}`
				}))}
			header="Snapshots"
		/>
	{/await}

	{#await getAllFabricGameVersions()}
		<CardList cards={[]} header="Fabric" load />
	{:then data}
		<CardList
			cards={data
				.filter((version) => version.stable)
				.slice(0, 15)
				.map((version) => ({
					name: version.version,
					desc: 'Lightweight modding toolchain for Minecraft.',
					image: image
				}))}
			header="Fabric"
		/>
	{/await}
</div>
