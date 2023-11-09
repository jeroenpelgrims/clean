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
