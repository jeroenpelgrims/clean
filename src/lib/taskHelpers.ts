import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import type { Task } from './db/models';

dayjs.extend(duration);

export function taskToIntervalDuration(task: Task) {
	return dayjs.duration({
		[`${task.intervalUnit}s`]: task.intervalValue,
	});
}
