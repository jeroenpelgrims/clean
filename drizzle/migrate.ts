import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { client, db } from '../src/lib/db/index';

await migrate(db, { migrationsFolder: './drizzle/migrations' });
client.close();
