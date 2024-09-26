import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { apiRoutes, authRoutes, privateRoutes, protectedApiRoutes } from "./constants/matchers";

export default async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const token = await getToken({ req });
    const isLoggedIn = !!token;
    const isUnprotectedApi = nextUrl.pathname.startsWith(apiRoutes);
    const isProtectedApi = protectedApiRoutes.includes(nextUrl.pathname);
    const isPrivateRoutes = privateRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if (isUnprotectedApi) return;

    if (isProtectedApi) {
        if (!isLoggedIn) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl))
        }
        return;
    }

    if (!isLoggedIn && isPrivateRoutes) return Response.redirect(new URL('/auth/login', nextUrl))
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}