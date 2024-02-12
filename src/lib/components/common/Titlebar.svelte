<script lang="ts">
	export let title: string;
</script>

<div class="section is-small is-flex is-justify-content-space-between gap-1">
	<h1 class="title">{title}</h1>
	<slot />
</div>
