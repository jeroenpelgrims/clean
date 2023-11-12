<script lang="ts">
	import type { WithStringId } from '$lib/db';
	import type { TaskGroup } from '$lib/db/models';
	import TaskLine from '../TaskLine.svelte';
	import { manageTasks } from '../page.store';

	export let group: WithStringId<TaskGroup>;
</script>

<div class="section is-small">
	<div class="title is-5 is-flex is-align-items-center gap-2">
		{group.name}
	</div>
	<table class="table is-fullwidth is-striped is-narrow is-hoverable">
		<!-- <thead>
			<tr>
				<th>Task</th>
				<th>Status</th>
				<th class="has-text-right">Actions</th>
			</tr>
		</thead> -->
		<tbody>
			{#each group.tasks as task}
				<TaskLine {task} />
			{/each}
		</tbody>
	</table>

	{#if $manageTasks}
		<div class="is-flex is-justify-content-center">
			<button class="button is-small">
				<span class="icon is-small">
					<i class="fas fa-plus" />
				</span>
				<span>New task</span>
			</button>
		</div>
	{/if}
</div>
