<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { Task } from '$lib/models/task';
	import type { WithStringId } from '$lib/mongo';
	import TaskForm from './TaskForm/index.svelte';

	export let task: WithStringId<Task>;
	let editing = false;
</script>

<tr>
	<td class="is-vcentered">
		<div>{task.name}</div>
		<div class="is-size-7">Every {task.intervalValue} {task.intervalUnit}</div>
	</td>
	<td class="is-vcentered"
		><span class="tag is-danger is-light">In 2 days</span></td
	>
	<td class="is-vcentered has-text-right">
		<button
			class="button is-small is-success is-light"
			title="Mark as completed"
		>
			<span class="icon">
				<i class="fa-solid fa-check" />
			</span>
		</button>
		<button
			class="button is-small is-warning is-light"
			title="Remove task"
			on:click={() => (editing = true)}
		>
			<span class="icon">
				<i class="fa-solid fa-pencil" />
			</span>
		</button>
	</td>
</tr>

<Modal isOpen={editing} onClose={() => (editing = false)}>
	<TaskForm {task} afterSubmit={() => (editing = false)} />
</Modal>
