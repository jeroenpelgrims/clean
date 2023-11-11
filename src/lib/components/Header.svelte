<script lang="ts">
	let menuOpen = false;

	export let userTeams: { _id: string; name: string }[];
	export let selectedTeamId: string;
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
							<option value={team._id} selected={team._id === selectedTeamId}>
								{team.name}
							</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="navbar-item">
				<a href="/notifications">Notifications</a>
			</div>
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
