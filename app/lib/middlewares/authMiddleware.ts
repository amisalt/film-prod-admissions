import { NextRequest, NextResponse } from 'next/server'
import { createServerSideClient } from '../supabase/server'

export async function authMiddleware(request: NextRequest) {
  if(!request.nextUrl.pathname.startsWith('/auth') && !request.nextUrl.pathname.startsWith('/error')){
    const supabase = createServerSideClient()

    const {
      data: { user },
    } = await (await supabase).auth.getUser()

    if ( !user ) {
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