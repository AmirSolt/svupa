import type { Session } from "@supabase/supabase-js";
import { fetchProfile } from '$lib/funcs/server/database/index.js'


export const load = async ({locals: { getSession } }) => {
  const session:Session|null = await getSession()
	const profile: Profile | null = await fetchProfile(session)
  console.log(profile)
  return {
    session,
    profile
  }
}





