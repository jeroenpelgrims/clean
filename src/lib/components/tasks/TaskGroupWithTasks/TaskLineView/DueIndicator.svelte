<script lang="ts">
	import type { Task } from '$lib/db/models';
	import { taskToIntervalDuration } from '$lib/taskHelpers';
	import dayjs from 'dayjs';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import updateLocale from 'dayjs/plugin/updateLocale';

	dayjs.extend(updateLocale);
	dayjs.extend(relativeTime);
	dayjs.extend(localizedFormat);

	export let task: Task;
	export let lastCompleted: Date | null | undefined;

	$: taskInterval = taskToIntervalDuration(task);
	$: deadline = lastCompleted
		? lastCompleted.valueOf() + taskInterval.asMilliseconds()
		: undefined;
	$: pastDeadline = dayjs().isAfter(deadline);
	$: warningTime = deadline
		? deadline - taskInterval.asMilliseconds() * 0.7
		: undefined;
	$: lastCompletedText = generateLastCompletedText(deadline, lastCompleted);

	function generateLastCompletedText(
		deadline: number | undefined,
		lastCompleted: Date | null | undefined,
	) {
		if (!lastCompleted) {
			return `This task has never been logged as completed before.`;
		}
		const lcText = dayjs(lastCompleted).format('ll LT');
		const ndText = dayjs(deadline).format('ll LT');

		if (pastDeadline) {
			return `Last completed on ${lcText}, was due on ${ndText}.`;
		} else {
			return `Last completed on ${lcText}, next due on ${ndText}.`;
		}
	}
</script>

<span
	class="tag is-light is-medium"
	class:is-info={!lastCompleted}
	class:is-danger={pastDeadline}
	class:is-warning={dayjs().isAfter(warningTime)}
	class:is-success={dayjs().isBefore(warningTime)}
	title={lastCompletedText}
>
	{#if !lastCompleted}
		New
	{:else}
		Due {dayjs(deadline).fromNow()}
	{/if}
</span>
