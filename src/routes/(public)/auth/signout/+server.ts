import { error, redirect } from "@sveltejs/kit"

export const GET = async ({ locals:{supabaseAuthServer} }) => {
	const { error: err } = await supabaseAuthServer.auth.signOut()

	if (err) {
		throw error(500, "Something went wrong logging you out.")
	}

	throw redirect(303, "/")
}