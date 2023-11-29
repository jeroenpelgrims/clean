import type { ObjectId, WithId } from 'mongodb';

export enum IntervalUnit {
	Day = 'day',
	Week = 'week',
	Month = 'month',
	Year = 'year',
}

export interface Task {
	name: string;
	intervalValue: number;
	intervalUnit: IntervalUnit;
}

export interface TaskGroup {
	name: string;
	tasks: WithId<Task>[];
}

export interface Team {
	name: string;
	taskGroups: WithId<TaskGroup>[];
}

export interface TaskLog {
	taskId: ObjectId;
	timestamp: Date;
}
