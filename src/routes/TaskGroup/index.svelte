<script lang="ts">
	import type { WithStringId } from '$lib/db';
	import type { TaskGroup } from '$lib/db/models';
	import TaskLine from '../TaskLine.svelte';

	export let group: WithStringId<TaskGroup>;
</script>

<div class="section">
	<div class="title is-5">{group.name}</div>
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
