//pages any users can access

export const publicRoutes = [
    "/",
    "/about"
]

//routes that start with this prefix are used for api authentication purposes

export const apiAuthPrefix = "/api/auth"

//protect api calls from unauthorized users

export const apiRoutePrefix = "/api"

//the default redirect path after logging in

export const DEFAULT_LOGIN_REDIRECT = "/chat"