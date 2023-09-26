// src/routes/auth/callback/+server.ts
import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabaseAuthServer } }) => {
  const code = url.searchParams.get('code')

  if (code) {
    await supabaseAuthServer.auth.exchangeCodeForSession(code)
  }

  throw redirect(303, '/')
}
