<script>
	import TeamsPage from '$lib/components/teams/TeamsPage/index.svelte';

	export let data;
</script>

<TeamsPage selectedTeam={data.selectedTeam} userTeams={data.userTeams} />
