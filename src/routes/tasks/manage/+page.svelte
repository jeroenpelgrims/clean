<script lang="ts">
	import TaskLineEditable from '$lib/components/tasks/TaskGroupWithTasks/TaskLineEditable/index.svelte';
	import TaskGroupWithTasks from '$lib/components/tasks/TaskGroupWithTasks/index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="is-flex is-justify-content-flex-end gap-1">
	<a href="/" class="button is-danger">
		<span class="icon is-small">
			<i class="fas fa-chevron-left" />
		</span>
		<span>Back</span>
	</a>
</div>

{#each data.taskGroups as group}
	<TaskGroupWithTasks {group} canAddTask={true}>
		{#each group.tasks as task}
			<TaskLineEditable {task} />
		{:else}
			<div class="level">
				<div class="level-item has-text-grey-light has-text-centered">
					This group is empty.
				</div>
			</div>
		{/each}
	</TaskGroupWithTasks>
{/each}
