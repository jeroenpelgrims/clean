<script lang="ts">
	import GroupItem from '$lib/components/common/GroupItem.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import Titlebar from '$lib/components/common/Titlebar.svelte';
	import TeamForm from '$lib/components/teams/TeamForm/index.svelte';
	import type { Team } from '$lib/db/models';
	import LeaveTeamButton from './LeaveTeamButton.svelte';
	import SelectTeamButton from './SelectTeamButton.svelte';

	export let selectedTeam: Team | undefined;
	export let userTeams: Team[];

	let createTeamModalOpen = false;
</script>

<Titlebar title="Teams" />

{#each userTeams as team}
	<GroupItem>
		<svelte:fragment slot="title">
			{team.name}
		</svelte:fragment>
		<svelte:fragment slot="actions">
			{#if team.id !== selectedTeam?.id}
				<SelectTeamButton teamId={team.id} />

				<LeaveTeamButton teamId={team.id} />
			{:else}
				<span class="has-text-primary">
					Active
					<i class="fas fa-check" />
				</span>
			{/if}
		</svelte:fragment>
	</GroupItem>
{/each}

<section class="section is-small">
	<button
		class="button is-success"
		on:click={() => (createTeamModalOpen = true)}
	>
		<span class="icon is-small">
			<i class="fas fa-plus" />
		</span>
		<span>Create new team</span>
	</button>
</section>

<Modal
	isOpen={createTeamModalOpen}
	onClose={() => (createTeamModalOpen = false)}
>
	<TeamForm afterSave={() => (createTeamModalOpen = false)} />
</Modal>
