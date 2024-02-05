import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { client, connect } from '../src/lib/db/index';

const db = connect();
await migrate(db, { migrationsFolder: './drizzle/migrations' });
client.close();
