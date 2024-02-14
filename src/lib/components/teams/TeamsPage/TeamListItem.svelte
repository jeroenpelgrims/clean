<script lang="ts">
	import GroupItem from '$lib/components/common/GroupItem.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import type { Team, TeamUser, User } from '$lib/db/models';
	import TeamForm from '../TeamForm/index.svelte';
	import LeaveTeamButton from './LeaveTeamButton.svelte';
	import SelectTeamButton from './SelectTeamButton.svelte';

	export let activeUser: User;
	export let team: Team & { username: string | null };
	export let selectedTeam: Team | undefined;
	export let otherMembers: TeamUser[];
	let editTeamModalOpen = false;
</script>

<GroupItem>
	<svelte:fragment slot="title">
		{team.name}
	</svelte:fragment>
	<svelte:fragment slot="actions">
		{#if team.id !== selectedTeam?.id}
			<SelectTeamButton teamId={team.id} />
			<LeaveTeamButton teamId={team.id} />
		{:else}
			<button class="button is-white">
				<span class="content is-normal has-text-primary">
					Active
					<i class="fas fa-check" />
				</span>
			</button>
		{/if}
	</svelte:fragment>

	<p class="block">
		In this team you're known as "{team.username ?? activeUser.email}".
	</p>

	<ul class="block">
		{#each otherMembers.filter((member) => member.teamId === team.id) as member}
			<li>{member.username}</li>
		{/each}
	</ul>

	<div class="block">
		<button
			class="button is-small"
			title="Invite a user to the team"
			type="submit"
		>
			<span class="icon">
				<i class="fas fa-user-plus" />
			</span>
			<span>Invite user</span>
		</button>

		<button class="button is-small" on:click={() => (editTeamModalOpen = true)}>
			<span class="icon">
				<i class="fas fa-pencil" />
			</span>
			<span>Edit team settings</span>
		</button>
	</div>
</GroupItem>

<Modal isOpen={editTeamModalOpen} onClose={() => (editTeamModalOpen = false)}>
	<TeamForm
		{team}
		userId={activeUser.id}
		username={team.username}
		afterSave={() => (editTeamModalOpen = false)}
	/>
</Modal>
