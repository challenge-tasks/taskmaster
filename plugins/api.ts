import { $fetch, type FetchOptions } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig()

    const fetchOptions: FetchOptions = {
        baseURL: config.public.apiBaseUrl
    }

    const api = $fetch.create(fetchOptions);

    return {
        provide: {
            api
        }
    }
})