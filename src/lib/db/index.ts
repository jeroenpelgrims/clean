import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import config from '../../../drizzle.config';
import * as schema from './schema';

export const client = createClient(config.dbCredentials);
export const db = drizzle(client, { schema });
