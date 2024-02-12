<script lang="ts">
	import Modal from '$lib/components/common/Modal.svelte';
	import Titlebar from '$lib/components/common/Titlebar.svelte';
	import TaskLineView from '$lib/components/tasks/TaskGroupWithTasks/TaskLineView/index.svelte';
	import TaskGroupWithTasks from '$lib/components/tasks/TaskGroupWithTasks/index.svelte';
	import GroupForm from '../lib/components/groups/GroupForm/index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let addGroupModalOpen = false;
</script>

<Titlebar title="Task dashboard">
	<div>
		<a href="/groups/manage" class="button">
			<span class="icon is-small">
				<i class="fas fa-folder-open" />
			</span>
			<span>Manage groups</span>
		</a>

		<a href="/tasks/manage" class="button">
			<span class="icon is-small">
				<i class="fas fa-list-check" />
			</span>
			<span>Manage tasks</span>
		</a>
	</div>
</Titlebar>

{#each data.taskGroups as group}
	<TaskGroupWithTasks {group}>
		{#each group.tasks as task}
			<TaskLineView {task} lastCompleted={data.lastCompleted.get(task.id)} />
		{:else}
			<div class="level">
				<div class="level-item has-text-grey-light has-text-centered">
					This group is empty.
				</div>
			</div>
		{/each}
	</TaskGroupWithTasks>
{/each}

<Modal isOpen={addGroupModalOpen} onClose={() => (addGroupModalOpen = false)}>
	<GroupForm afterSave={() => (addGroupModalOpen = false)} />
</Modal>
