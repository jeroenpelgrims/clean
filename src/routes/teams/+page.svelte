<script lang="ts">
	import TeamsPage from '$lib/components/teams/TeamsPage/index.svelte';
	import type { User } from '$lib/db/models.js';

	export let data;
	const user = data.user! as User;
</script>

<TeamsPage
	{user}
	selectedTeam={data.selectedTeam}
	userTeams={data.userTeams}
	otherMembers={data.otherMembers}
/>
