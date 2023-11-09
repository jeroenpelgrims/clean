<script lang="ts">
	import type { PageData } from './$types';
	import TaskForm from './TaskForm/index.svelte';
	import TaskLine from './TaskLine.svelte';

	export let data: PageData;
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Task</th>
			<th>Status</th>
			<th class="has-text-right">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each data.tasks as task}
			<TaskLine {task} />
		{/each}
	</tbody>
</table>

<div class="columns">
	<div class="column is-half">
		<TaskForm />
	</div>
</div>
