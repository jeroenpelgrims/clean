<script lang="ts">
	import type { User } from '@auth/core/types';

	let menuOpen = false;

	export let user: User | undefined = undefined;
	export let userTeams: { id: string; name: string }[];
	export let selectedTeamId: string | undefined;
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
				Team:
				<div class="select">
					<select>
						{#each userTeams as team}
							<option value={team.id} selected={team.id === selectedTeamId}>
								{team.name}
							</option>
						{/each}
					</select>
				</div>
			</div>

			{#if user}
				<!-- User: {JSON.stringify(user)} -->
				<div class="navbar-item">
					<a href="/auth/signout">Log out</a>
				</div>
			{:else}
				<!-- <div class="navbar-item">
					<a href="/auth/register">register</a>
				</div> -->
				<div class="navbar-item">
					<a href="/auth/signin">Log in</a>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style lang="scss">
	:global(.navbar-brand svg) {
		height: 2rem;
	}
</style>
