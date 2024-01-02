<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TaskGroup } from '$lib/db/models';

	export let group: TaskGroup | undefined = undefined;
	export let afterSave: () => void = () => {};
</script>

<div class="card">
	<div class="card-header">
		<p class="card-header-title is-flex is-justify-content-space-between">
			{#if group}Edit group{:else}Create new task group{/if}
		</p>
	</div>
	<div class="card-content">
		<form
			method="POST"
			action={group ? '/groups?/updateGroup' : '/groups?/createGroup'}
			use:enhance={() => {
				return async ({ update }) => {
					await update();
					afterSave();
				};
			}}
		>
			{#if group}
				<input name="id" type="hidden" value={group?.id} />
			{/if}

			<label class="field">
				<span class="label">Name</span>
				<div class="control">
					<!-- svelte-ignore a11y-autofocus-->
					<input
						name="name"
						class="input"
						type="text"
						placeholder="Kitchen tasks"
						required
						value={group?.name ?? ''}
						autofocus
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
