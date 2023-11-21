<script lang="ts">
	import { browser } from '$app/environment';
	import type { WithStringId } from '$lib/db';
	import type { Task } from '$lib/db/models';
	import 'bulma-calendar/dist/css/bulma-calendar.min.css';
	import { onMount } from 'svelte';

	export let task: WithStringId<Task>;
	export let afterSave: () => void = () => {};

	let showCalendar = false;

	onMount(async () => {
		if (!browser) {
			return;
		}
		const bulmaCalendar = await import('bulma-calendar');
		var calendars = new bulmaCalendar.default('input[type="date"]', {
			displayMode: 'inline',
			maxDate: new Date(),
		});
	});
</script>

<div class="card">
	<div class="card-header">
		<p class="card-header-title is-flex is-justify-content-space-between">
			Mark "{task.name}" as done
		</p>
	</div>
	<div class="card-content">
		{#if !showCalendar}
			<div class="level is-justify-content-center">
				<p>We'll assume you completed this task today</p>

				<button class="button" on:click={() => (showCalendar = true)}>
					Choose a different day
				</button>
			</div>
		{/if}

		<div class="level is-justify-content-center" class:hidden={!showCalendar}>
			<input type="date" value={new Date().toISOString().substring(0, 10)} />
		</div>

		<div class="level is-justify-content-center">
			<button class="button is-primary is-large"> Mark as done </button>
		</div>
	</div>
</div>

<style lang="scss">
	.hidden {
		display: none;
	}
</style>
