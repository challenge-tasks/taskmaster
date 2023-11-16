import { AsyncData } from "nuxt/app"
import { IAuthPayload, AuthResponse, IAuthError } from "types"

export function useAuth() {
    const { $api } = useNuxtApp()
    const config = useRuntimeConfig()

    const { setSignUpModalState } = useModalsStore()
    const { setAuthenticatedState, setAuthorizingState } = useAuthStore()

    async function signUp(payload: IAuthPayload): Promise<AsyncData<AuthResponse | null, IAuthError | Error | null>> {

        try {

            setAuthorizingState(true)

            const response = await useAsyncData<AuthResponse>('register', () => $api('/register', { method: 'POST', body: { ...payload } }))

            if (response.status.value === 'success') {
                setSignUpModalState(false)
                setAuthenticatedState(true)
            }

            return response

        } catch (error: any) {

            console.log(error)

            return error

        } finally {
            setAuthorizingState(false)
        }
    }

    async function signIn(payload: IAuthPayload) {

        try {

            setAuthorizingState(true)

            const response = await useFetch<AuthResponse>(config.public.apiBaseUrl + '/login', {
                method: 'POST',
                body: payload,
                server: false
            })

            if (response.status.value === 'success') {
                setAuthenticatedState(true)
            }


            return response

        } catch (error) {

            console.log(error)

        } finally {
            setAuthorizingState(false)
        }
    }

    async function logOut() {

        const router = useRouter()

        const res = await useFetch(config.public.apiBaseUrl + '/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer`
            },
            server: false
        })

        if (res.status.value === 'success') {
            setAuthenticatedState(false)
        }

        router.push('/')
    }

    return {
        logOut,
        signUp,
        signIn
    }
}

