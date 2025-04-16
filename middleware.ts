import { NextRequest } from 'next/server'
import { authMiddleware } from '@/app/lib/middlewares/authMiddleware'
import { rolesMiddleware } from '@/app/lib/middlewares/rolesMiddleware'

export async function middleware(request: NextRequest) {
  const authResponse = await authMiddleware(request)
  if(authResponse && authResponse?.status == 307){
    return authResponse
  }
  const rolesResponse = await rolesMiddleware(new NextRequest(request.url, {
    headers:authResponse?.headers
  }))
  if(rolesResponse && rolesResponse.status==307){
    return rolesResponse
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}