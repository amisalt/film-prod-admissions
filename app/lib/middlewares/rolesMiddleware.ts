import { NextResponse, type NextRequest } from 'next/server'
import { createServerSideClient } from '../supabase/server'
import { UserRow } from '../types/supabase';

export async function rolesMiddleware(request:NextRequest) {
  if(request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/moderator")){
    const id = request.headers.get("x-user-id")?.split(" ")[1]
    const supabase = createServerSideClient();

    const { 
      data: userRow,
      error: roleError
    }:{data:UserRow|null, error:object|null} = await (await supabase).from("users").select("role").eq("id", id).single()

    if (roleError){
      console.log("auth error")
      const url = request.nextUrl.clone()
      url.pathname = '/error'
      url.search = `?error=${roleError}?code=${roleError}?message=${roleError}`
      return NextResponse.redirect(url)
    }
    if( !userRow || roleError ){
      console.log("role error")
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      return NextResponse.redirect(url)
    }
    if ( userRow?.role != "ADMIN" && request.nextUrl.pathname.startsWith("/admin") ){
      console.log("NO ADMIN ON ADMIN")
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
    if ( userRow?.role == "USER" && request.nextUrl.pathname.startsWith("/moderator") ){
      console.log("NO MODER ON MODER")
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