import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import {
    apiAuthPrefix,
    apiRoutePrefix,
    publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const loggedIn = !!req.auth

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isApiRoute = nextUrl.pathname.startsWith(apiRoutePrefix)

    if (isApiAuthRoutes) return

    if (!loggedIn && !isPublicRoute) {
        if (isApiRoute) {
            return Response.json({ message: "unauthorized" }, { status: 401 })
        }
        return Response.redirect(new URL("/", nextUrl))
    }
    return
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}