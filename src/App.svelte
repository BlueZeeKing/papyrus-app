<script lang="ts">
	import { onMount } from 'svelte';
	import Layout from './components/Layout.svelte';
	import { route, type Route } from './libs/route';

	import Overview from './pages/Overview.svelte';
	import User from './pages/User.svelte';

	const pages: { [key: string]: ConstructorOfATypedSvelteComponent } = {
		overview: Overview,
		user: User
	};

	let routeLocal = 'overview';

	onMount(() => {
		window.electron.route.onChange((newRoute) => route.set(newRoute as Route));
	});

	route.subscribe((newRoute) => {
		routeLocal = newRoute;
	});
</script>

<Layout><svelte:component this={pages[routeLocal]} /></Layout>
