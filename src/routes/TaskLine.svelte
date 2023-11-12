<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { WithStringId } from '$lib/db';
	import type { Task } from '$lib/db/models';
	import TaskForm from './TaskForm/index.svelte';
	import { manageGroups, manageTasks } from './page.store';

	export let task: WithStringId<Task>;
	let editing = false;
</script>

<tr>
	<td class="is-vcentered">
		<div>{task.name}</div>
		<div class="is-size-7">Every {task.intervalValue} {task.intervalUnit}</div>
	</td>
	<td class="is-vcentered">
		<span class="tag is-danger is-light">In 2 days</span>
	</td>
	<td class="is-vcentered has-text-right">
		{#if !$manageGroups}
			{#if $manageTasks}
				<button
					class="button is-warning is-light"
					title="Remove task"
					on:click={() => (editing = true)}
				>
					<span class="icon">
						<i class="fa-solid fa-pencil" />
					</span>
				</button>
			{:else}
				<button class="button is-success is-light" title="Mark as completed">
					<span class="icon">
						<i class="fa-solid fa-check" />
					</span>
				</button>
			{/if}
		{/if}
	</td>
</tr>

<Modal isOpen={editing} onClose={() => (editing = false)}>
	<TaskForm {task} afterSave={() => (editing = false)} />
</Modal>
