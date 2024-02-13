<div class="section is-small">
	<div class="columns is-vcentered">
		<div class="column">
			<span class="title is-5">
				<slot name="title" />
			</span>
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
