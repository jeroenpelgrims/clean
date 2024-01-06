<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../global.scss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main class="container is-max-desktop">
	<Header user={data.user} selectedTeam={data.selectedTeam} />

	<slot />
</main>

<style lang="scss">
</style>
