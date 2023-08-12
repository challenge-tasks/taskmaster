import { AuthPayload } from "types"

export const useUserAuth = defineStore('userAuth', () => {

    const config = useRuntimeConfig()

    const signUpUrl = config.public.apiBaseUrl + '/register'
    const signInUrl = config.public.apiBaseUrl + '/login'

    function signUp(payload: AuthPayload) {
        useFetch(signUpUrl, {
            method: 'POST',
            body: payload
        })
    }

    function signIn(payload: AuthPayload) {
        useFetch(signInUrl, {
            method: 'POST',
            body: payload
        })
    }

    return {
        signUp,
        signIn
    }
})

