<script lang="ts">
	import Layout from './components/Layout.svelte';

	import Overview from './pages/Overview.svelte';
	import User from './pages/User.svelte';

	const pages: { [key: string]: ConstructorOfATypedSvelteComponent } = {
		overview: Overview,
		user: User
	};

	let route = 'overview';
</script>

<Layout><svelte:component this={pages[route]} /></Layout>
