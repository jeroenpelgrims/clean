<script lang="ts">
	import type { TaskGroup } from '$lib/db/models';

	export let group: TaskGroup;
</script>

<div class="section is-small">
	<div class="title is-5 is-flex is-justify-content-space-between">
		{group.name}
		<div class="is-flex gap-1">
			<slot name="buttons" />
		</div>
	</div>

	<slot />
</div>
