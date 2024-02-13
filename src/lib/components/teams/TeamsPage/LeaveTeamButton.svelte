<script lang="ts">
	import { enhance } from '$app/forms';

	export let teamId: string;
</script>

<form
	method="POST"
	action="?/leave"
	use:enhance={({ cancel }) => {
		if (!confirm('Are you sure you want to leave this team?')) {
			cancel();
			return;
		}

		return async ({ update }) => {
			update();
		};
	}}
>
	<input name="id" type="hidden" value={teamId} />
	<button class="button is-warning" title="Leave team" type="submit">
		<span class="icon">
			<i class="fas fa-right-from-bracket" />
		</span>
		<span>Leave team</span>
	</button>
</form>

<style lang="scss">
	form {
		display: inline-block;
	}
</style>
