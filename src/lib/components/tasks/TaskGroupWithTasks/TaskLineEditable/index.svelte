<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/common/Modal.svelte';
	import type { Task } from '$lib/db/models';
	import TaskForm from '../../TaskForm/index.svelte';

	let editModalOpen = false;
	export let task: Task;
</script>

<div class="level is-mobile">
	<div class="level-left taskName">
		<div class="level-item">
			<div>
				<p>{task.name}</p>
				<p class="is-size-7">
					Every {task.intervalValue}
					{task.intervalUnit}
				</p>
			</div>
		</div>
	</div>
	<div class="level-right">
		<div class="level-item">
			<button
				class="button is-warning is-light is-medium"
				title="Edit task"
				on:click={() => (editModalOpen = true)}
			>
				<span class="icon">
					<i class="fa-solid fa-pencil" />
				</span>
			</button>
		</div>
		<div class="level-item">
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
				<input name="groupId" type="hidden" value={task.taskGroupId} />
				<input name="id" type="hidden" value={task.id} />
				<button
					class="button is-danger is-light is-medium"
					title="Remove task"
					type="submit"
				>
					<span class="icon">
						<i class="fa-solid fa-trash-can" />
					</span>
				</button>
			</form>
		</div>
	</div>
</div>

<Modal isOpen={editModalOpen} onClose={() => (editModalOpen = false)}>
	<TaskForm
		{task}
		groupId={task.taskGroupId}
		afterSave={() => (editModalOpen = false)}
	/>
</Modal>

<style lang="scss">
	.taskName,
	.taskName > .level-item {
		flex-shrink: 1;
	}
</style>
