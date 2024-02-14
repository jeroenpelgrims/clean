<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Team } from '$lib/db/models';

	export let team: Team | undefined = undefined;
	export let userId: string | undefined = undefined;
	export let username: string | null = null;
	export let afterSave: () => void = () => {};
	let editing = team && userId;
</script>

<div class="card">
	<div class="card-header">
		<p class="card-header-title is-flex is-justify-content-space-between">
			{#if editing}Edit team{:else}Create new team{/if}
		</p>
	</div>
	<div class="card-content">
		<form
			method="POST"
			action={team ? '/teams?/edit' : '/teams?/create'}
			use:enhance={() => {
				return async ({ update }) => {
					await update();
					afterSave();
				};
			}}
		>
			{#if editing}
				<input name="teamId" type="hidden" value={team?.id} />
				<input name="teamUserId" type="hidden" value={userId} />
			{/if}

			<label class="field">
				<span class="label">Name</span>
				<div class="control">
					<!-- svelte-ignore a11y-autofocus-->
					<input
						name="teamName"
						class="input"
						type="text"
						placeholder="Team name"
						required
						value={team?.name ?? ''}
						autofocus={team === undefined}
					/>
				</div>
				<p class="help has-text-grey-light">The name of the new team.</p>
			</label>

			<label class="field">
				<span class="label">Your name in the team</span>
				<div class="control">
					<!-- svelte-ignore a11y-autofocus-->
					<input
						name="username"
						class="input"
						type="text"
						placeholder="Your name"
						required
						value={username ?? ''}
					/>
				</div>
				<p class="help has-text-grey-light">
					This is what the other team members will know you as.<br />
					You can have a different name in each team.
				</p>
			</label>

			<div class="is-flex is-justify-content-flex-end gap-2">
				<button class="button" type="button" on:click={afterSave}>
					Cancel
				</button>
				<button class="button is-primary" type="submit">
					{#if editing}Update{:else}Add{/if}
				</button>
			</div>
		</form>
	</div>
</div>
