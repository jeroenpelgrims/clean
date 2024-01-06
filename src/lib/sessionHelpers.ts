export async function getUserIdFromLocals(locals: App.Locals) {
	const session = await locals.getSession();
	const userId = session?.user?.id;
	return userId;
}
