<script lang="ts">
import Layout from "./Layout.svelte";
export let callbackUrl: string;
</script>

<Layout>
	<mj-section>
		<mj-column>
			<mj-text>Sign in by clicking the following button:</mj-text>
			<mj-button href={callbackUrl}>Log in</mj-button>
			<mj-text>
				If you did not request this email you can safely ignore it.
			</mj-text>
		</mj-column>
	</mj-section>
</Layout>