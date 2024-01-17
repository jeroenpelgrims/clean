<div class="level is-mobile">
	<div class="level-left taskName">
		<div class="level-item">
			<slot name="name" />
		</div>
	</div>
	<div class="level-right">
		<slot name="buttons" />
	</div>
</div>

<style lang="scss">
	.taskName,
	.taskName > .level-item {
		flex-shrink: 1;
	}
</style>
