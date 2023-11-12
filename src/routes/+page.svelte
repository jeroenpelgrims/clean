<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { PageData } from './$types';
	import GroupForm from './GroupForm/index.svelte';
	import TaskGroup from './TaskGroup/index.svelte';

	export let data: PageData;
	const { selectedTeam } = data;
	let addGroupModalOpen = false;
</script>

{#each data.selectedTeam.taskGroups as group}
	<TaskGroup {group} />
{/each}

<div id="addButtons" class="is-flex is-justify-content-center">
	<button class="button" on:click={() => (addGroupModalOpen = true)}>
		<span class="icon is-small">
			<i class="fas fa-plus" />
		</span>
		<span>Add new group</span>
	</button>
</div>

<Modal isOpen={addGroupModalOpen} onClose={() => (addGroupModalOpen = false)}>
	<GroupForm afterSave={() => (addGroupModalOpen = false)} />
</Modal>

<style lang="scss">
	#addButtons {
		gap: 0.25rem;
	}
</style>
