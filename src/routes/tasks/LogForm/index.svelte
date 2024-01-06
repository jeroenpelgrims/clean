<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Task } from '$lib/db/models';
	import dayjs from 'dayjs';
	import 'flatpickr/dist/flatpickr.min.css';
	import { onMount } from 'svelte';

	export let task: Task;
	export let afterSave: () => void = () => {};

	let timestamp: Date = new Date();

	onMount(async () => {
		const flatpickr = await import('flatpickr');
		flatpickr.default("input[type='date']", {
			inline: true,
			enableTime: true,
			time_24hr: true,
			maxDate: new Date(),
			defaultDate: timestamp,
			minuteIncrement: 1,
		});
	});
</script>

<div class="card">
	<div class="card-header">
		<p class="card-header-title is-flex is-justify-content-space-between">
			When did you complete "{task.name}"?
		</p>
	</div>
	<form
		class="card-content"
		method="POST"
		action="/tasklog?/logDone"
		use:enhance={() => {
			return async ({ update }) => {
				update();
				afterSave();
			};
		}}
	>
		<input name="id" type="hidden" value={task.id} />

		<div class="level is-justify-content-center">
			<input
				name="timestamp"
				type="date"
				value={dayjs(timestamp).toISOString()}
				on:change={(e) => {
					timestamp = dayjs(e.currentTarget.value).toDate();
				}}
				required
				class="hidden"
			/>
		</div>

		<div class="is-flex level is-justify-content-center gap-2">
			<button class="button is-large" on:click={afterSave}>Cancel</button>
			<button class="button is-primary is-large"> Mark as done </button>
		</div>
	</form>
</div>

<style lang="scss">
	.hidden {
		display: none;
	}

	p {
		display: block;
	}
</style>
