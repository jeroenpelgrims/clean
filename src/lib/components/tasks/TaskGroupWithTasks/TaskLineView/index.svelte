<script lang="ts">
	import Modal from '$lib/components/common/Modal.svelte';
	import type { Task, TaskGroup } from '$lib/db/models';
	import TaskForm from '../../TaskForm/index.svelte';
	import LogForm from '../LogForm/index.svelte';
	import DueIndicator from './DueIndicator.svelte';

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
		<div class="level-item">
			<!-- <button
				class="button is-info is-light is-medium"
				title="Show task log"
				on:click={() => alert('This function is not implemented yet')}
			>
				<span class="icon">
					<i class="fa-solid fa-magnifying-glass" />
				</span>
			</button> -->
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
