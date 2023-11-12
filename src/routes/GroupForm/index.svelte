<script lang="ts">
	import { enhance } from '$app/forms';
	import type { WithStringId } from '$lib/db';
	import type { TaskGroup } from '$lib/db/models';

	export let group: WithStringId<TaskGroup> | undefined = undefined;
	export let afterSave: () => void = () => {};
</script>

<div class="card">
	<div class="card-header">
		<p class="card-header-title is-flex is-justify-content-space-between">
			{#if group}Edit group{:else}Create new task group{/if}

			<!-- {#if group}
				<form
					id="deleteForm"
					method="POST"
					action="?/deleteTask"
					use:enhance={({ cancel }) => {
						console.log('SUBMIT');
						if (!confirm('Are you sure you want to delete this task?')) {
							cancel();
							return;
						}

						return async ({ update }) => {
							update();
						};
					}}
				>
					<input name="id" type="hidden" value={task?._id} />
					<button class="button is-danger is-outlined" type="submit">
						<span class="icon"><i class="fa-regular fa-trash-can" /></span>
					</button>
				</form>
			{/if} -->
		</p>
	</div>
	<div class="card-content">
		<form
			method="POST"
			action={group ? '?/updateGroup' : '?/createGroup'}
			use:enhance={() => {
				return async ({ update }) => {
					update();
					afterSave();
				};
			}}
		>
			{#if group}
				<input name="id" type="hidden" value={group?._id} />
			{/if}

			<label class="field">
				<span class="label">Name</span>
				<div class="control">
					<input
						name="name"
						class="input"
						type="text"
						placeholder="Kitchen tasks"
						required
						value={group?.name ?? ''}
					/>
				</div>
				<p class="help has-text-grey-light">
					The name of the group to which the tasks belong.
				</p>
			</label>

			<div class="is-flex is-justify-content-flex-end gap-2">
				<button class="button is-primary" type="submit">
					{#if group}Update{:else}Add{/if}
				</button>
				<button class="button" type="button" on:click={afterSave}>
					Cancel
				</button>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	label {
		display: block;
	}
</style>
