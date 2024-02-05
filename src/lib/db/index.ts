import { env } from '$env/dynamic/private';
import { createClient, type Client } from '@libsql/client';
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// export const client = createClient({
// 	url: env.TURSO_DB_URL ?? '',
// 	authToken: env.TURSO_DB_AUTH_TOKEN,
// });
// export const db = drizzle(client, { schema });

export let client: Client;
let db: LibSQLDatabase<typeof schema>;
export function connect() {
	if (!db) {
		client = createClient({
			url: env.TURSO_DB_URL ?? '',
			authToken: env.TURSO_DB_AUTH_TOKEN,
		});
		db = drizzle(client, { schema });
	}
	return db;
}
