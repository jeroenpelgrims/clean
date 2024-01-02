<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { PageData } from './$types';
	import TaskGroup from './TaskGroup.svelte';
	import GroupForm from './groups/GroupForm/index.svelte';
	import { manageGroups, manageTasks } from './page.store';

	export let data: PageData;
	let addGroupModalOpen = false;
</script>

<div class="is-flex is-justify-content-flex-end gap-1">
	{#if $manageGroups || $manageTasks}
		<button
			class="button is-danger"
			on:click={() => {
				$manageTasks = false;
				$manageGroups = false;
			}}
		>
			<span class="icon is-small">
				<i class="fas fa-chevron-left" />
			</span>
			<span>Back</span>
		</button>
	{:else}
		<button class="button" on:click={() => ($manageGroups = true)}>
			<span class="icon is-small">
				<i class="fas fa-folder-open" />
			</span>
			<span>Manage groups</span>
		</button>

		<button class="button" on:click={() => ($manageTasks = true)}>
			<span class="icon is-small">
				<i class="fas fa-list-check" />
			</span>
			<span>Manage tasks</span>
		</button>
	{/if}
</div>

{#each data.taskGroups as group}
	<TaskGroup {group} />
{/each}

{#if $manageGroups}
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
{/if}

<Modal isOpen={addGroupModalOpen} onClose={() => (addGroupModalOpen = false)}>
	<GroupForm afterSave={() => (addGroupModalOpen = false)} />
</Modal>

<style lang="scss">
	#addButtons {
		gap: 0.25rem;
	}
</style>
