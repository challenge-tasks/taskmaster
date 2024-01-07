import { $fetch, type FetchOptions } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {

    const token = useCookie('token')
    const config = useRuntimeConfig()


    const fetchOptions: FetchOptions = {
        baseURL: config.public.apiBaseUrl,
        onRequest({ request, options }) {
            
            options.headers = options.headers || {}
            options.query = options.query || {}

            if (token.value) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token.value}`
                }
            }
        }
    }

    const api = $fetch.create(fetchOptions);

    return {
        provide: {
            api
        }
    }
})