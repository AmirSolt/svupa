import { superValidate } from 'sveltekit-superforms/server'
import { nameSchema } from '$lib/utils/schema'
import { fail, error, redirect } from '@sveltejs/kit';
import { updateName } from '$lib/funcs/server/database/index.js';
import {stripe} from '$lib/utils/stripeHelper.server.js'
import { fetchProfile } from '$lib/funcs/server/database/index.js'
import {PUBLIC_DOMAIN} from '$env/static/public';
    
export async function load(event) {
	const form = await superValidate(event, nameSchema)
    return {
        form,
    }
}


export const actions = {
	changeName: async (event) => {
		const session = await event.locals.getSession()
		if (!session) {
			throw error(400, {
				message: "You are not logged in!",
			})
		}


		const form = await superValidate(event, nameSchema)
        
		if (!form.valid) {
			return fail(400, { form })
		}

		const updateSuccess = await updateName(session, form.data.first_name??null, form.data.last_name??null)

        if(!updateSuccess){
            return fail(400, { form })
        }

        return {form}
    },

	createPortal: async (event) =>{

		const session = await event.locals.getSession()
		if (!session) {
			throw error(400, {
				message: "Error: You are not logged in!",
			})
		}

		const profile: Profile | null = await fetchProfile(session)
		if (!profile) {
			throw error(400, {
				message: "Error: No profile",
			})
		}
		if (profile.wallet.customer_id==null) {
			throw error(400, {
				message: "Error: No customer id",
			})
		}

		const portalSession = await stripe.billingPortal.sessions.create({
			customer: profile.wallet.customer_id,
			return_url: `${PUBLIC_DOMAIN}/profile/settings`,
		});

		if (portalSession.url==null) {
            throw error(400, {
                message: "Error: Portal Creation",
            })
        }

		throw redirect(303, portalSession.url);
	}
}