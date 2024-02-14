<script lang="ts">
	import GroupItem from '$lib/components/common/GroupItem.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import Titlebar from '$lib/components/common/Titlebar.svelte';
	import TeamForm from '$lib/components/teams/TeamForm/index.svelte';
	import type { Team, TeamUser, User } from '$lib/db/models';
	import LeaveTeamButton from './LeaveTeamButton.svelte';
	import SelectTeamButton from './SelectTeamButton.svelte';

	export let user: User;
	export let selectedTeam: Team | undefined;
	export let userTeams: (Team & { username: string | null })[];
	export let otherMembers: TeamUser[];

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
				<button class="button is-white">
					<span class="content is-normal has-text-primary">
						Active
						<i class="fas fa-check" />
					</span>
				</button>
			{/if}
		</svelte:fragment>

		<p class="block">
			In this team you're known as "{team.username ?? user.email}".
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

			<button class="button is-small">
				<span class="icon">
					<i class="fas fa-i-cursor" />
				</span>
				<span>Change username</span>
			</button>
		</div>
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
