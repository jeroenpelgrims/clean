import { env } from '$env/dynamic/private';
import { MongoClient, type WithId } from 'mongodb';
import type { Task } from './models/task';

export function serializeId<TDocument>(doc: WithId<TDocument>) {
	const serializedDoc = { ...doc, _id: doc._id.toString() };
	return serializedDoc as Omit<WithId<TDocument>, '_id'> & { _id: string };
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
