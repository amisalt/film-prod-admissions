import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/lib/supabase/middleware'
// import { createClient } from './lib/supabase/server'
// import { redirect } from 'next/navigation'

export async function middleware(request: NextRequest) {
  
  // const supabase = await createClient()
  // const {error, data} = await supabase.auth.getUser()
  // if(error){
  //   redirect("/error")
  // }
  // if(!data.user){
  //   redirect("/auth")
  // }
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}