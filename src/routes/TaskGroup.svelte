<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/Modal.svelte';
	import type { Task, TaskGroup } from '$lib/db/models';
	import TaskLine from './TaskLine.svelte';
	import GroupForm from './groups/GroupForm/index.svelte';
	import { manageGroups, manageTasks } from './page.store';
	import TaskForm from './tasks/TaskForm/index.svelte';

	export let group: TaskGroup & { tasks: Task[] };
	let editGroupModalOpen = false;
	let addTaskModalOpen = false;
</script>

<div class="section is-small">
	<div class="title is-5 is-flex is-justify-content-space-between">
		{group.name}
		<div class="is-flex gap-1">
			{#if $manageGroups}
				<button
					class="button is-warning is-light"
					on:click={() => (editGroupModalOpen = true)}
				>
					<span class="icon is-small">
						<i class="fas fa-pencil" />
					</span>
				</button>
				<form
					method="POST"
					action="/groups?/deleteGroup"
					use:enhance={({ cancel }) => {
						if (!confirm('Are you sure you want to delete this group?')) {
							cancel();
							return;
						}
						return async ({ update }) => {
							await update();
						};
					}}
				>
					<input name="id" type="hidden" value={group.id} />
					<button type="submit" class="button is-danger is-light">
						<span class="icon is-small">
							<i class="fas fa-trash-can" />
						</span>
					</button>
				</form>
			{/if}
		</div>
	</div>

	{#if !$manageGroups}
		<table class="table is-fullwidth is-striped is-narrow is-hoverable">
			<tbody>
				{#each group.tasks as task}
					<TaskLine {task} {group} />
				{/each}
			</tbody>
		</table>
		{#if group.tasks.length === 0}
			<div class="level">
				<div class="level-item has-text-grey-light has-text-centered">
					This group is empty.
				</div>
			</div>
		{/if}
	{/if}

	{#if $manageTasks}
		<div class="is-flex is-justify-content-center">
			<button
				class="button is-small"
				on:click={() => (addTaskModalOpen = true)}
			>
				<span class="icon is-small">
					<i class="fas fa-plus" />
				</span>
				<span>New task</span>
			</button>
		</div>
	{/if}
</div>

<Modal isOpen={editGroupModalOpen} onClose={() => (editGroupModalOpen = false)}>
	<GroupForm {group} afterSave={() => (editGroupModalOpen = false)} />
</Modal>

<Modal isOpen={addTaskModalOpen} onClose={() => (addTaskModalOpen = false)}>
	<TaskForm {group} afterSave={() => (addTaskModalOpen = false)} />
</Modal>
