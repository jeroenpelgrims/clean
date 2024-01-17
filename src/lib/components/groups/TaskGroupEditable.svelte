<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TaskGroup } from '$lib/db/models';
	import Modal from '../common/Modal.svelte';
	import GroupForm from './GroupForm/index.svelte';
	import TaskGroupBase from './TaskGroupBase/index.svelte';

	export let group: TaskGroup;

	let editGroupModalOpen = false;
</script>

<TaskGroupBase {group}>
	<slot slot="buttons">
		<button
			class="button is-warning is-light is-medium"
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
			<button type="submit" class="button is-danger is-light is-medium">
				<span class="icon is-small">
					<i class="fas fa-trash-can" />
				</span>
			</button>
		</form>
	</slot>
</TaskGroupBase>

<Modal isOpen={editGroupModalOpen} onClose={() => (editGroupModalOpen = false)}>
	<GroupForm {group} afterSave={() => (editGroupModalOpen = false)} />
</Modal>
