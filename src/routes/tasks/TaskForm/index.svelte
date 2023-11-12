<script lang="ts">
	import { enhance } from '$app/forms';
	import type { WithStringId } from '$lib/db';
	import { IntervalUnit, type Task, type TaskGroup } from '$lib/db/models';

	export let group: WithStringId<TaskGroup>;
	export let task: WithStringId<Task> | undefined = undefined;
	export let afterSave: () => void = () => {};
</script>

<div class="card">
	<div class="card-header">
		<p class="card-header-title is-flex is-justify-content-space-between">
			{#if task}Edit task{:else}Create new task{/if}
		</p>
	</div>
	<div class="card-content">
		<form
			method="POST"
			action={task ? '/tasks?/updateTask' : '/tasks?/createTask'}
			use:enhance={() => {
				return async ({ update }) => {
					update();
					afterSave();
				};
			}}
		>
			<input name="groupId" type="hidden" value={group._id} />
			{#if task}
				<input name="id" type="hidden" value={task?._id} />
			{/if}

			<label class="field">
				<span class="label">Name</span>
				<div class="control">
					<!-- svelte-ignore a11y-autofocus-->
					<input
						name="name"
						class="input"
						type="text"
						placeholder="Text input"
						required
						value={task?.name ?? ''}
						autofocus
					/>
				</div>
				<p class="help has-text-grey-light">
					What is the task that needs to be done?
				</p>
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
							value={task?.intervalValue ?? 7}
							required
						/>

						<div class="select is-small">
							<select
								name="intervalUnit"
								required
								value={task?.intervalUnit ?? IntervalUnit.Day}
							>
								{#each Object.entries(IntervalUnit) as [label, value]}
									<option {value}>{label}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<p class="help has-text-grey-light">
					How often should this task be repeated?
				</p>
			</label>

			<div class="is-flex is-justify-content-flex-end gap-2">
				<button class="button" type="button" on:click={afterSave}>
					Cancel
				</button>
				<button class="button is-primary" type="submit">
					{#if task}Update{:else}Add{/if}
				</button>
			</div>
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
</style>
