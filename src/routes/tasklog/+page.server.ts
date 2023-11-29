export const actions = {
	logDone: async ({ request }) => {
		const data = await request.formData();
		const taskId = data.get('id')?.toString()!;
		const timestamp = data.get('timestamp')?.toString()!;

		console.log('logDone', taskId, timestamp);

		// const { close, tasklog } = await connect();
		// await tasklog.insertOne({
		// 	taskId: ObjectId.createFromHexString(taskId),
		// 	timestamp: new Date(timestamp),
		// });
		// await close();
	},
};
