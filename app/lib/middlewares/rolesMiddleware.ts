import { NextResponse, type NextRequest } from 'next/server'
import { createServerSideClient } from '../supabase/server'
import { UserRow } from '../types/supabase';

export async function rolesMiddleware(request:NextRequest) {
  if(request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/moderator")){
    const id = request.headers.get("x-user-id")?.split(" ")[1]
    const supabase = createServerSideClient();

    const { 
      data: userRow
    }:{data:UserRow|null, error:object|null} = await (await supabase).from("users").select("role").eq("id", id).single()

    if( !userRow ){
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      return NextResponse.redirect(url)
    }
    if ( userRow?.role != "ADMIN" && request.nextUrl.pathname.startsWith("/admin") ){
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
    if ( userRow?.role == "USER" && request.nextUrl.pathname.startsWith("/moderator") ){
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    return NextResponse.next({
      request
    })
  }
  return NextResponse.next()
}