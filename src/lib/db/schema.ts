import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password').notNull(),
});

// export const userRelations = relations(user, ({ many }) => ({
// 	teams: many(team),
// }));

export const team = sqliteTable('team', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
});

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

// export const teamRelations = relations(team, ({ many }) => ({
// 	users: many(user),
// }));

export const taskGroup = sqliteTable('taskGroup', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	teamId: text('teamId').references(() => team.id, { onDelete: 'cascade' }),
});

// export const taskGroupRelations = relations(taskGroup, ({ one, many }) => ({
// 	team: one(team),
// 	tasks: many(task),
// }));

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

// export const taskRelations = relations(task, ({ one, many }) => ({
// 	group: one(taskGroup),
// 	logs: many(taskLog),
// }));

export const taskLog = sqliteTable('taskLog', {
	id: text('id').primaryKey(),
	timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
	taskId: text('taskId').references(() => task.id, { onDelete: 'cascade' }),
});

// export const taskLogRelations = relations(taskLog, ({ one }) => ({
// 	task: one(task),
// }));
