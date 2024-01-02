import { relations } from 'drizzle-orm';
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	name: text('name'),
	email: text('email').notNull().unique(),
	emailVerified: integer('emailVerified', { mode: 'timestamp' }),
	image: text('image'),
	// username: text('username').notNull().unique(),
	// passwordHash: text('password').notNull(),
});

export const account = sqliteTable('account', {
	id: text('id').primaryKey(),
	userId: text('userId').references(() => user.id, { onDelete: 'cascade' }),
	type: text('type'),
	provider: text('provider'),
	providerAccountId: text('providerAccountId'),
	refresh_token: text('refresh_token'),
	access_token: text('access_token'),
	expires_at: integer('expires_at'),
	token_type: text('token_type'),
	scope: text('scope'),
	id_token: text('id_token'),
	session_state: text('session_state'),
});

export const session = sqliteTable('session', {
	id: text('id'),
	expires: integer('expires', { mode: 'timestamp' }).notNull(),
	sessionToken: text('sessionToken'),
	userId: text('userId').references(() => user.id, { onDelete: 'cascade' }),
});

export const verificationToken = sqliteTable('verificationToken', {
	id: text('identifier'),
	token: text('token'),
	expires: integer('expires', { mode: 'timestamp' }).notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
	memberOf: many(teamUser),
}));

export const team = sqliteTable('team', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
});

export const teamRelations = relations(team, ({ many }) => ({
	members: many(teamUser),
}));

export const teamUser = sqliteTable(
	'teamUser',
	{
		teamId: text('teamId')
			.notNull()
			.references(() => team.id, { onDelete: 'cascade' }),
		userId: text('userId')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
	},
	(teamUser) => ({
		pk: primaryKey({ columns: [teamUser.teamId, teamUser.userId] }),
	}),
);

export const teamUserRelations = relations(teamUser, ({ one }) => ({
	team: one(team, {
		fields: [teamUser.teamId],
		references: [team.id],
	}),
	member: one(user, {
		fields: [teamUser.userId],
		references: [user.id],
	}),
}));

export const taskGroup = sqliteTable('taskGroup', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	teamId: text('teamId').references(() => team.id, { onDelete: 'cascade' }),
});

export const taskGroupRelations = relations(taskGroup, ({ one, many }) => ({
	team: one(team),
	tasks: many(task),
}));

export const task = sqliteTable('task', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	intervalValue: integer('intervalValue').notNull(),
	intervalUnit: text('intervalUnit', {
		enum: ['day', 'week', 'month', 'year'],
	}).notNull(),
	taskGroupId: text('taskGroupId').references(() => taskGroup.id, {
		onDelete: 'cascade',
	}),
});

export const taskRelations = relations(task, ({ one, many }) => ({
	group: one(taskGroup, {
		fields: [task.taskGroupId],
		references: [taskGroup.id],
	}),
	// logs: many(taskLog),
}));

export const taskLog = sqliteTable('taskLog', {
	id: text('id').primaryKey(),
	timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
	taskId: text('taskId').references(() => task.id, { onDelete: 'cascade' }),
});

// export const taskLogRelations = relations(taskLog, ({ one }) => ({
// 	task: one(task),
// }));
