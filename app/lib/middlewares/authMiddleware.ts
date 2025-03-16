import { NextRequest, NextResponse } from 'next/server'
import { createServerSideClient } from '../supabase/server'

export async function authMiddleware(request: NextRequest) {
  if(!request.nextUrl.pathname.startsWith('/auth') && !request.nextUrl.pathname.startsWith('/error')){
    const supabase = createServerSideClient()

    const {
      data: { user },
      error: authError
    } = await (await supabase).auth.getUser()

    if (authError){
      console.log("auth error")
      const url = request.nextUrl.clone()
      url.pathname = '/error'
      url.search = `?error=${authError.name}?code=${authError.code}?message=${authError.message}`
      return NextResponse.redirect(url)
    }
    if ( !user || authError ) {
      console.log("no user")
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      return NextResponse.redirect(url)
    }

    const supabaseResponse = NextResponse.next({
      request:{
        ...request
      }
    })
    supabaseResponse.headers.set('x-user-id', `Bearer ${user.id}`)
    return supabaseResponse
  }
  return NextResponse.next()
}