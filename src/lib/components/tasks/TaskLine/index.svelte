<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/common/Modal.svelte';
	import type { Task, TaskGroup } from '$lib/db/models';
	import { manageGroups, manageTasks } from '$lib/stores/manage';
	import DueIndicator from '../DueIndicator.svelte';
	import LogForm from '../LogForm/index.svelte';
	import TaskForm from '../TaskForm/index.svelte';

	export let group: TaskGroup;
	export let task: Task;
	export let lastCompleted: Date | null | undefined;

	let editing = false;
	let logging = false;
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
			<DueIndicator {task} {lastCompleted} />
		</div>
		{#if !$manageGroups}
			{#if $manageTasks}
				<div class="level-item">
					<button
						class="button is-warning is-light is-medium"
						title="Edit task"
						on:click={() => (editing = true)}
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
						<input name="groupId" type="hidden" value={group.id} />
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
			{:else}
				<div class="level-item">
					<button
						class="button is-info is-light is-medium"
						title="Show task log"
						on:click={() => alert('This function is not implemented yet')}
					>
						<span class="icon">
							<i class="fa-solid fa-magnifying-glass" />
						</span>
					</button>
				</div>
				<div class="level-item">
					<button
						class="button is-success is-light is-medium"
						title="Mark as completed"
						on:click={() => (logging = true)}
					>
						<span class="icon">
							<i class="fa-solid fa-check" />
						</span>
					</button>
				</div>
			{/if}
		{/if}
	</div>
</div>

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

<style lang="scss">
	.taskName,
	.taskName > .level-item {
		flex-shrink: 1;
	}
</style>
