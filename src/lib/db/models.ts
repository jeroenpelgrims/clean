import type { InferSelectModel } from 'drizzle-orm';
import type { task, taskGroup, team, user } from './schema';

export enum IntervalUnit {
	Day = 'day',
	Week = 'week',
	Month = 'month',
	Year = 'year',
}

export type User = InferSelectModel<typeof user>;
export type Task = InferSelectModel<typeof task>;
export type TaskGroup = InferSelectModel<typeof taskGroup>;
export type Team = InferSelectModel<typeof team>;
