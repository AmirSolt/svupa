import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate, setError } from 'sveltekit-superforms/server'
import { signupSchema } from '$lib/utils/schema'
import {createStripeCustomer} from '$lib/utils/stripeHelper.server.js'


export const load = async (event) => {
    const session = await event.locals.getSession()
    if (session) {
        throw redirect(302, '/')
    }

	// always return `form` in load and form actions
	const form = await superValidate(event, signupSchema)
	return { form }
}

export const actions = {
	default: async (event) => {


		const form = await superValidate(event, signupSchema)
        
		if (!form.valid) {
			return fail(400, { form })
		}		

		const first_name:string|null = form.data.first_name??null
		const last_name:string|null = form.data.last_name??null

		const customer_id = await createStripeCustomer(form.data.email, first_name, last_name)
		if(customer_id==null){
			throw error(400, {
				message: "Sorry, there was an error. Please try later.",
			})
		}


		const { data, error:signupError } = await event.locals.supabaseAuthServer.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					customer_id:customer_id,
					first_name: first_name,
					last_name: last_name,
				}
			}
		})
		if(signupError!=null){
			
			throw error(signupError.status??500, {
				message: signupError.message,
			})
		}

        throw redirect(302, '/auth/confirm')
    }
}


