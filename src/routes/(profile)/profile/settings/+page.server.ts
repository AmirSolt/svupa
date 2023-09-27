import { superValidate } from 'sveltekit-superforms/server'
import { nameSchema } from '$lib/utils/schema'
import { fail, error } from '@sveltejs/kit';
import { updateName } from '$lib/funcs/server/database/index.js';

    
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
    }
}