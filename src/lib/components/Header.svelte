<script lang="ts">
	let menuOpen = false;
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<i class="fa-solid fa-broom has-text-primary" />
		</a>

		<a
			role="button"
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbarBasicExample"
			on:click={() => (menuOpen = !menuOpen)}
			href="."
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</a>
	</div>

	<div class="navbar-menu" class:is-active={menuOpen}>
		<div class="navbar-end">
			<div class="navbar-item">
				<a href="/profile">Profile</a>
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	:global(.navbar-brand svg) {
		height: 2rem;
	}
</style>
