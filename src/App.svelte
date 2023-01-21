<script lang="ts">
	import Layout from './components/Layout.svelte';
	import { route } from './libs/route';

	import Overview from './pages/Overview.svelte';
	import User from './pages/User.svelte';

	const pages: { [key: string]: ConstructorOfATypedSvelteComponent } = {
		overview: Overview,
		user: User
	};
</script>

<Layout><svelte:component this={pages[$route]} /></Layout>
