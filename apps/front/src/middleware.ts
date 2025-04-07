import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const session = await getSession()

  //Если пользователь не аутентифицирован, то перенаправляем его на страницу аутентификации.
  if ( !session || !session.user ) {
    //request.url - базовая часть адреса, "/auth/sign-in" - дополнительная часть адреса
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }
}

export const config = {
  //Массив маршрутов, для которых будет вызвана middleware
  matcher: ['/user/:path*']
}