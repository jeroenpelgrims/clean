export enum IntervalUnit {
	Day = 'day',
	Week = 'week',
	Month = 'month',
	Year = 'year',
}

export type Task = {
	name: string;
	intervalValue: number;
	intervalUnit: IntervalUnit;
};
