<script lang="ts">
	import type { Team } from '$lib/db/models';
	import type { User } from '@auth/core/types';

	let menuOpen = false;

	export let user: User | undefined;
	export let selectedTeam: Team | undefined;
</script>

<nav class="navbar" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<i class="fa-solid fa-broom has-text-primary" />
			<h1 class="title">Clean</h1>
		</a>

		<a
			role="button"
			class="navbar-burger"
			class:is-active={menuOpen}
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
			{#if user}
				<div class="navbar-item team">
					<strong>{selectedTeam?.name}</strong>
					<button class="button">Change team</button>
				</div>
				<div class="navbar-item">
					<a href="/auth/signout" class="button">Log out</a>
				</div>
			{:else}
				<div class="navbar-item">
					<a href="/auth/signin" class="button is-primary">Log in</a>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style lang="scss">
	:global(.navbar-brand svg) {
		height: 2rem;
	}

	.team {
		gap: 0.5rem;
	}

	.title {
		margin-left: 1rem;
	}
</style>
