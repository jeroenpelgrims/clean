<script lang="ts">
	import Modal from '$lib/components/common/Modal.svelte';
	import Titlebar from '$lib/components/common/Titlebar.svelte';
	import TeamForm from '$lib/components/teams/TeamForm/index.svelte';
	import type { Team, TeamUser, User } from '$lib/db/models';
	import TeamListItem from './TeamListItem.svelte';

	export let activeUser: User;
	export let selectedTeam: Team | undefined;
	export let userTeams: (Team & { username: string | null })[];
	export let otherMembers: TeamUser[];

	let createTeamModalOpen = false;
</script>

<Titlebar title="Teams" />

{#each userTeams as team}
	<TeamListItem {team} {selectedTeam} {otherMembers} {activeUser} />
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
