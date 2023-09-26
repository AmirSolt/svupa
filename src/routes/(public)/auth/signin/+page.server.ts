import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'

import { signinSchema } from '$lib/utils/schema'


export const load = async (event) => {
	const session = await event.locals.getSession()
	if (session) {
		throw redirect(302, '/')
	}
	const form = await superValidate(event, signinSchema)
	return { form }
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, signinSchema)
		
		if (!form.valid) {
			return fail(400, { form })
		}

		const { data: signinData, error: signinError } = await event.locals.supabaseAuthServer.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password,
		})
		if (signinError != null) {
			throw error(signinError.status ?? 500, {
				message: signinError.message,
			})
		}
		throw redirect(302, '/profile/generate')
	}
}