import { env } from '$env/dynamic/private';
import { MongoClient, type EnhancedOmit, type WithId } from 'mongodb';
import type { TaskLog, Team } from './models';

export type WithStringId<T, TDocument = EnhancedOmit<T, '_id'>> = {
	[K in keyof TDocument]: TDocument[K] extends any[]
		? WithStringId<TDocument[K][number]>[]
		: TDocument[K];
} & {
	_id: string;
};

export function serializeId<T>(doc: WithId<T>): WithStringId<T> {
	const serializedDoc = { ...doc, _id: doc._id.toString() };
	const serializedEntries = Object.entries(serializedDoc).map(
		([key, value]) => [
			key,
			Array.isArray(value) ? value.map(serializeId) : value,
		],
	);

	return Object.fromEntries(serializedEntries);
}

export async function connect() {
	const mongo = new MongoClient(env.MONGO_URL);
	const client = await mongo.connect();
	const db = mongo.db('clean');
	const teams = db.collection<Team>('teams');
	const tasklog = db.collection<TaskLog>('tasklog');

	return {
		close: () => client.close(),
		db,
		teams,
		tasklog,
	};
}
