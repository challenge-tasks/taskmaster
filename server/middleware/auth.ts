import { AuthResponse, GithubUserData, IUser } from "@/types"

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
    }

    const query = getQuery(event)
    const config = useRuntimeConfig(event)

    async function getUserAccessToken(): Promise<GithubResponse> {
        
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
                    github_id: user.id 
                })

                username = response.data.user.username

                setCookie(event, 'token', response.data.token)
            }

            return res
            
        } catch (error: any) {
            
            console.log(error)

            return error

        }

    }

    async function getUserFromGithub(token: string): Promise<GithubUserData> {

        try {

            const res = await $fetch<GithubUserData>('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(res)

            return res
            
        } catch (error: any) {
            
            console.log(error)
            return error

        }
        
    }

    async function authUserOnServer(data: GithubDataServerPayload): Promise<AuthResponse> {
        try {
            

            const res = await $fetch<AuthResponse>(config.public.apiBaseUrl + '/github/login', {
                method: 'POST',
                body: {
                    email: data.email,
                    avatar: data.avatar,
                    username: data.username,
                    github_id: data.github_id
                }
            })

            return res
            
        } catch (error: any) {
            console.log(error)

            return error
        }
    }

    if (query.code) {
        await getUserAccessToken()

        if (username) {
            await sendRedirect(event, `/profile/${username}`, 302)
        } else {
            await sendRedirect(event, '/', 302)
        }

    }
})