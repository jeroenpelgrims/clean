<script lang="ts">
	export let isOpen: boolean;
	export let onClose: () => void;
</script>

{#if isOpen}
	<div class="modal" class:is-active={isOpen}>
		<div
			class="modal-background"
			role="button"
			tabindex={-1}
			on:click={onClose}
			on:keyup={onClose}
		/>
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
