import { env } from '$env/dynamic/private';
import { MongoClient, type WithId } from 'mongodb';
import type { Task } from './models/task';

export type WithStringId<TDocument> = Omit<WithId<TDocument>, '_id'> & {
	_id: string;
};

export function serializeId<TDocument>(
	doc: WithId<TDocument>,
): WithStringId<TDocument> {
	const serializedDoc = { ...doc, _id: doc._id.toString() };
	return serializedDoc as WithStringId<TDocument>;
}

export async function connect() {
	const mongo = new MongoClient(env.MONGO_URL);
	const client = await mongo.connect();
	const db = mongo.db('clean');
	const tasks = db.collection<Task>('tasks');

	return {
		close: () => client.close(),
		db,
		tasks,
	};
}
