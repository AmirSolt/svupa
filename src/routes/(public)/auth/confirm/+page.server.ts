import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'

import { tokenSchema } from '$lib/utils/schema'


export const load = async (event) => {
	const session = await event.locals.getSession()
	if (session) {
		throw redirect(302, '/')
	}
	const form = await superValidate(event, tokenSchema)
	return { form }
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, tokenSchema)
		
		if (!form.valid) {
			return fail(400, { form })
		}

        
        const { data: tokenData, error: tokenError } = await event.locals.supabaseAuthServer.auth.verifyOtp({
            email: form.data.email, token: form.data.token, type: 'email'})
        
		if (tokenError != null) {
			throw error(tokenError.status ?? 500, {
				message: tokenError.message,
			})
		}
		throw redirect(302, form.data.redirectPath??"/")
	}
}