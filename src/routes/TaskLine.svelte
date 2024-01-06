<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/Modal.svelte';
	import type { Task, TaskGroup } from '$lib/db/models';
	import DueIndicator from './DueIndicator.svelte';
	import { manageGroups, manageTasks } from './page.store';
	import LogForm from './tasks/LogForm/index.svelte';
	import TaskForm from './tasks/TaskForm/index.svelte';

	export let group: TaskGroup;
	export let task: Task;
	export let lastCompleted: Date | null | undefined;

	let editing = false;
	let logging = false;
</script>

<tr>
	<td class="is-vcentered">
		<div>{task.name}</div>
		<div class="is-size-7">Every {task.intervalValue} {task.intervalUnit}</div>
	</td>
	<td class="is-vcentered">
		<DueIndicator {task} {lastCompleted} />
	</td>
	<td class="is-flex is-justify-content-flex-end gap-1">
		{#if !$manageGroups}
			{#if $manageTasks}
				<button
					class="button is-warning is-light"
					title="Edit task"
					on:click={() => (editing = true)}
				>
					<span class="icon">
						<i class="fa-solid fa-pencil" />
					</span>
				</button>
				<form
					id="deleteForm"
					method="POST"
					action="/tasks?/deleteTask"
					use:enhance={({ cancel }) => {
						if (!confirm('Are you sure you want to delete this task?')) {
							cancel();
							return;
						}

						return async ({ update }) => {
							update();
						};
					}}
				>
					<input name="groupId" type="hidden" value={group.id} />
					<input name="id" type="hidden" value={task.id} />
					<button
						class="button is-danger is-light"
						title="Remove task"
						type="submit"
					>
						<span class="icon">
							<i class="fa-solid fa-trash-can" />
						</span>
					</button>
				</form>
			{:else}
				<button
					class="button is-info is-light is-medium"
					title="Show task log"
					on:click={() => alert('This function is not implemented yet')}
				>
					<span class="icon">
						<i class="fa-solid fa-magnifying-glass" />
					</span>
				</button>
				<button
					class="button is-success is-light is-medium"
					title="Mark as completed"
					on:click={() => (logging = true)}
				>
					<span class="icon">
						<i class="fa-solid fa-check" />
					</span>
				</button>
			{/if}
		{/if}
	</td>
</tr>

<Modal isOpen={editing} onClose={() => (editing = false)}>
	<TaskForm
		{task}
		groupId={task.taskGroupId}
		afterSave={() => (editing = false)}
	/>
</Modal>

<Modal isOpen={logging} onClose={() => (logging = false)}>
	<LogForm {task} afterSave={() => (logging = false)} />
</Modal>
