<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import '../global.scss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main class="container is-max-desktop">
	<Header user={data.user} />

	<slot />
</main>

<style lang="scss">
</style>
