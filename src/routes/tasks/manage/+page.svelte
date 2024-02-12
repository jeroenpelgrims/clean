<script lang="ts">
	import Titlebar from '$lib/components/common/Titlebar.svelte';
	import TaskLineEditable from '$lib/components/tasks/TaskGroupWithTasks/TaskLineEditable/index.svelte';
	import TaskGroupWithTasks from '$lib/components/tasks/TaskGroupWithTasks/index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Titlebar title="Manage tasks">
	<a href="/" class="button is-danger">
		<span class="icon is-small">
			<i class="fas fa-chevron-left" />
		</span>
		<span>Back</span>
	</a>
</Titlebar>

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
