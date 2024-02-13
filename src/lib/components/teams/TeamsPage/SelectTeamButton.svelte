<script lang="ts">
	import { enhance } from '$app/forms';

	export let teamId: string;
</script>

<form
	method="POST"
	action="?/select"
	use:enhance={({}) => {
		return async ({ update }) => {
			update();
		};
	}}
>
	<input name="id" type="hidden" value={teamId} />
	<button class="button" title="Select team" type="submit">
		<span class="icon">
			<i class="fas fa-repeat" />
		</span>
		<span>Select</span>
	</button>
</form>

<style lang="scss">
	form {
		display: inline-block;
	}
</style>
