import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql/driver';
import { migrate } from 'drizzle-orm/libsql/migrator';
import * as schema from '../src/lib/db/schema';

const client = createClient({
	url: process.env.TURSO_DB_URL ?? '',
	authToken: process.env.TURSO_DB_AUTH_TOKEN,
});
const db = drizzle(client, { schema });
await migrate(db, { migrationsFolder: './drizzle/migrations' });
client.close();
