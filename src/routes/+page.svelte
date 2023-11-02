<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { IntervalUnit } from '$lib/models/task';
	import TaskLine from './TaskLine.svelte';
</script>

{$page.data.tasks.length}

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Task</th>
			<th>Status</th>
			<th class="has-text-right">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each { length: 10 } as x}
			<TaskLine />
		{/each}
	</tbody>
</table>

<div class="card">
	<div class="card-header">
		<p class="card-header-title">Create new task</p>
	</div>
	<div class="card-content">
		<form method="POST" action="?/addTask" use:enhance>
			<label class="field">
				<span class="label">Name</span>
				<div class="control">
					<input name="name" class="input" type="text" placeholder="Text input" required />
				</div>
				<p class="help has-text-grey-light">What is the task that needs to be done?</p>
			</label>

			<label class="field">
				<span class="label">How often?</span>
				<div class="control">
					<div class="inline">
						<span>Every</span>

						<input
							name="intervalValue"
							class="input is-small"
							type="number"
							placeholder="Text input"
							value="7"
							required
						/>

						<div class="select is-small">
							<select name="intervalUnit" required>
								{#each Object.entries(IntervalUnit) as [label, value]}
									<option {value}>{label}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<p class="help has-text-grey-light">How often should this task be repeated?</p>
			</label>

			<button class="button is-primary" type="submit">Add</button>
		</form>
	</div>
</div>

<style lang="scss">
	label {
		display: block;
	}

	.inline {
		display: grid;
		grid-template-columns: min-content 3rem auto 1fr;
		gap: 0.5rem;
		align-items: center;
	}

	.card {
		max-width: 50%;
	}
</style>
