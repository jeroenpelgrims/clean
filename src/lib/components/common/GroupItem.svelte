<div class="section is-small">
	<div class="columns is-vcentered">
		<div class="column">
			<p class="title is-4">
				<slot name="title" />
			</p>
		</div>
		<div class="column has-text-right">
			<slot name="actions" />
		</div>
	</div>

	<slot />
</div>

<style lang="scss">
	.section .title {
		flex-direction: column !important;
	}
</style>
