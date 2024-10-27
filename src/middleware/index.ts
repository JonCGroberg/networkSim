import { navigate } from "astro:transitions/client";
import { useStore } from '@nanostores/react'
import { sessionId, } from "../store/Session";


export const onRequest = async (
    { request, redirect, locals }: { request: Request; redirect: Function; locals: any },
    next: Function
) => {
    const url = new URL(request.url);
    const { pathname } = url;

    console.log(request)

    // List of routes that don't require authentication
    const publicRoutes = ['/login', '/favicon.ico', '/public'];

    if (publicRoutes.some(route => pathname == route))
        return next();

    const loggedIn = (sessionId != undefined);

    if (!loggedIn)
        return navigate('/');

    // If there is an auth cookie, allow the request to proceed
    return next();
};
