<script lang="ts">
	import type { Task } from '$lib/db/models';
	import { taskToIntervalDuration } from '$lib/taskHelpers';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import updateLocale from 'dayjs/plugin/updateLocale';

	dayjs.extend(updateLocale);
	dayjs.extend(relativeTime);

	export let task: Task;
	export let lastCompleted: Date | null | undefined;
	$: taskInterval = taskToIntervalDuration(task);
	$: deadline = lastCompleted
		? lastCompleted.valueOf() + taskInterval.asMilliseconds()
		: undefined;
	$: warningTime = deadline
		? deadline - taskInterval.asMilliseconds() * 0.7
		: undefined;
</script>

<span
	class="tag is-light"
	class:is-info={!lastCompleted}
	class:is-danger={dayjs().isAfter(deadline)}
	class:is-warning={dayjs().isAfter(warningTime)}
	class:is-success={dayjs().isBefore(warningTime)}
>
	{#if !lastCompleted}
		Never completed
	{:else}
		Due {dayjs(deadline).fromNow()}
	{/if}
</span>
