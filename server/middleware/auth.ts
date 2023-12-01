import { getCookieExpirationDate } from "@/utils"
import { IAuthResponse, ISimpleSuccessResponse, IGithubUserData, IBaseErrorResponse } from "@/types"
import { AsyncData } from "nuxt/app"

export default defineEventHandler(async (event) => {

    let username = ''

    interface GithubResponse {
        access_token: string
        token_type: string
        scope: string
    }

    interface GithubDataServerPayload {
        username: string
        email: string
        github_id: number
        avatar: string
        github_url: string
    }

    const query = getQuery(event)
    const config = useRuntimeConfig(event)

    async function getUserAccessToken(): Promise<GithubResponse | IBaseErrorResponse> {

        try {

            const res = await $fetch<GithubResponse>('https://github.com/login/oauth/access_token', {
                method: 'POST',
                body: {
                    code: query.code,
                    client_id: config.public.github_client_id,
                    client_secret: config.github_client_secret,
                    redirect_uri: config.public.github_oauth_redirect_url
                }
            })

            if (res.access_token) {
                const user = await getUserFromGithub(res.access_token)
                const response = await authUserOnServer({
                    username: user.login,
                    email: user.email,
                    avatar: user.avatar_url,
                    github_url: user.html_url,
                    github_id: user.id
                })

                username = response.data.user.username

                setCookie(event, 'token', response.data.token, {
                    expires: getCookieExpirationDate(+config.public.cookieExpiresAfter)
                })
            }

            return res

        } catch (error: any) {

            console.log(error)

            return error

        }

    }

    async function getUserFromGithub(token: string): Promise<IGithubUserData> {

        try {

            const res = await $fetch<IGithubUserData>('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return res

        } catch (error: any) {

            console.log(error)
            return error

        }

    }

    async function authUserOnServer(data: GithubDataServerPayload): Promise<IAuthResponse> {

        const res = await $fetch<IAuthResponse>(config.public.apiBaseUrl + '/github/login', {
            method: 'POST',
            body: {
                email: data.email,
                avatar: data.avatar,
                github_url: data.github_url,
                username: data.username,
                github_id: data.github_id
            }
        })

        return res
    }

    async function verifyEmail({ id, hash }: { id: any, hash: any }): Promise<ISimpleSuccessResponse> {

        const token = getCookie(event, 'token')

        try {

            return await $fetch<ISimpleSuccessResponse>(config.public.apiBaseUrl + '/email-verification/verify', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: { id, hash }
            })

        } catch (error: any) {
            console.log(error)

            return error

        }
    }

    if (query.hash && query.id) {
        const response = await verifyEmail({ hash: query.hash, id: query.id })
        response.success ? await sendRedirect(event, `?verify=success`, 302) : await sendRedirect(event, `?verify=fail`, 302)
    }

    if (query.code) {
        const response = await getUserAccessToken()

        if (response?.data?.type) {
            await sendRedirect(event, '?fail_reason=' + response.data.type)
            return false
        }

        if (username) {
            await sendRedirect(event, `/profile/${username}`, 302)
        } else {
            await sendRedirect(event, '/', 302)
        }

    }
})