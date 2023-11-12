<script lang="ts">
	import type { WithStringId } from '$lib/db';
	import type { TaskGroup } from '$lib/db/models';
	import TaskLine from '../TaskLine.svelte';

	export let group: WithStringId<TaskGroup>;
</script>

<div class="section is-small">
	<div
		class="title is-5 is-flex is-justify-content-space-between is-align-items-center"
	>
		<a href="#">{group.name}</a>

		<button class="button">
			<span class="icon is-small">
				<i class="fas fa-plus" />
			</span>
			<span>Add task</span>
		</button>
	</div>
	<table class="table is-fullwidth is-striped is-narrow">
		<thead>
			<tr>
				<th>Task</th>
				<th>Status</th>
				<th class="has-text-right">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each group.tasks as task}
				<TaskLine {task} />
			{/each}
		</tbody>
	</table>
</div>
