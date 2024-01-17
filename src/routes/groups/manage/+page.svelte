<script lang="ts">
	import Modal from '$lib/components/common/Modal.svelte';
	import GroupForm from '$lib/components/groups/GroupForm/index.svelte';
	import TaskGroupEditable from '$lib/components/groups/TaskGroupEditable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let addGroupModalOpen = false;
</script>

<div class="is-flex is-justify-content-flex-end gap-1">
	<a href="/" class="button is-danger">
		<span class="icon is-small">
			<i class="fas fa-chevron-left" />
		</span>
		<span>Back</span>
	</a>
</div>

{#each data.taskGroups as group}
	<TaskGroupEditable {group} />
{/each}

<div class="level">
	<div class="level-item">
		<button class="button" on:click={() => (addGroupModalOpen = true)}>
			<span class="icon is-small">
				<i class="fas fa-plus" />
			</span>
			<span>Add group</span>
		</button>
	</div>
</div>

<Modal isOpen={addGroupModalOpen} onClose={() => (addGroupModalOpen = false)}>
	<GroupForm group={undefined} afterSave={() => (addGroupModalOpen = false)} />
</Modal>
