import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'

import { resetPassSchema } from '$lib/utils/schema'


export const load = async (event) => {
	const session = await event.locals.getSession()
	if (!session) {
		throw redirect(302, '/')
	}
	const form = await superValidate(event, resetPassSchema)
	return { form }
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, resetPassSchema)
		
		if (!form.valid) {
			return fail(400, { form })
		}

		const { data: resetData, error: resetError } = await event.locals.supabaseAuthServer.auth.updateUser({
			password: form.data.newPassword,
		})
		if (resetError != null) {
			throw error(resetError.status ?? 500, {
				message: resetError.message,
			})
		}



		const { error: singoutError } = await event.locals.supabaseAuthServer.auth.signOut()
		if (singoutError != null) {
			throw error(singoutError.status ?? 500, {
				message: singoutError.message,
			})
		}


		throw redirect(302, '/auth/signin')
	}
}