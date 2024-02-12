<script lang="ts">
	import GroupItem from '$lib/components/common/GroupItem.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import TaskForm from '$lib/components/tasks/TaskForm/index.svelte';
	import type { TaskGroup } from '$lib/db/models';

	export let group: TaskGroup;
	export let canAddTask = false;

	let addTaskModalOpen = false;
</script>

<GroupItem>
	<svelte:fragment slot="title">
		{group.name}
	</svelte:fragment>

	<slot />

	{#if canAddTask}
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
</GroupItem>

<Modal isOpen={addTaskModalOpen} onClose={() => (addTaskModalOpen = false)}>
	<TaskForm groupId={group.id} afterSave={() => (addTaskModalOpen = false)} />
</Modal>
