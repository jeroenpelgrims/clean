import { env } from '$env/dynamic/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

export const client = createClient({
	url: env.TURSO_DB_URL ?? '',
	authToken: env.TURSO_DB_AUTH_TOKEN,
});
export const db = drizzle(client, { schema });
