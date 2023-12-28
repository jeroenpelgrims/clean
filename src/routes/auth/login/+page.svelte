<form id="login" method="post" action="/api/auth/signin/login">
	<div class="field">
		<label>
			<span>Username</span>
			<div class="control">
				<input class="input" type="text" name="username" />
			</div>
		</label>
	</div>

	<div class="field">
		<label>
			<span>Password</span>
			<div class="control">
				<input class="input" type="password" name="password" />
			</div>
		</label>
	</div>

	<div class="field">
		<div class="control">
			<button class="button is-primary">Log in</button>
		</div>
	</div>
</form>

<style lang="scss">
	#login {
		max-width: 300px;
		margin: auto;
	}
</style>
