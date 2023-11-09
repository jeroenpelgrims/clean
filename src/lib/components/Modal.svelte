<script lang="ts">
	export let isOpen: boolean;
	export let onClose: () => void;
</script>

{#if isOpen}
	<div class="modal" class:is-active={isOpen}>
		<div class="modal-background" on:click={onClose} />
		<div class="modal-content">
			<slot />
		</div>
		<button
			class="modal-close is-large"
			aria-label="close"
			on:click={onClose}
		/>
	</div>
{/if}
