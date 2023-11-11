<script lang="ts">
	import type { PageData } from './$types';
	import TaskForm from './TaskForm/index.svelte';
	import TaskGroup from './TaskGroup/index.svelte';

	export let data: PageData;
	const { selectedTeam } = data;
	console.log(selectedTeam);
</script>

{#each selectedTeam.taskGroups as group}
	<TaskGroup {group} />
{/each}

<div id="addButtons" class="is-flex is-justify-content-center">
	<button class="button">
		<span class="icon is-small">
			<i class="fas fa-plus" />
		</span>
		<span>Add new group</span>
	</button>
	<button class="button">
		<span class="icon is-small">
			<i class="fas fa-plus" />
		</span>
		<span>Add new task</span>
	</button>
</div>

<div class="section">
	<div class="columns">
		<div class="column is-half is-offset-one-quarter">
			<TaskForm />
		</div>
	</div>
</div>

<style lang="scss">
	#addButtons {
		gap: 0.25rem;
	}
</style>
