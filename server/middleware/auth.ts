export default defineEventHandler(async (event) => {

    interface GithubResponse {
        access_token: string
        token_type: string
        scope: string
    }

    const config = useRuntimeConfig(event)
    const query = getQuery(event)

    if (query.code) {
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
            setCookie(event, 'gToken', res.access_token)
        }

        await sendRedirect(event, '/', 302)
    }
})