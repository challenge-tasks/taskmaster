import { AuthPayload, AuthResponse } from "types"

export const useUserAuth = defineStore('userAuth', () => {
    const token = useCookie('token')
    const config = useRuntimeConfig()
    const isAuthenticated = ref(false)

    if (token.value) {
        isAuthenticated.value = true
    }

    const { hideSignUpModal, hideSignInModal } = useAuthModals()

    async function signUp(payload: AuthPayload) {

        const response = await useFetch<AuthResponse>(config.public.apiBaseUrl + '/register', {
            method: 'POST',
            body: payload,
            server: false
        })

        watch(() => response.status.value, (newValue) => {

            if (newValue === 'success') {

                const token = useCookie('token')
                token.value = response.data.value?.data.token
                isAuthenticated.value = true

                hideSignUpModal()
            }
        })

        return response
    }

    async function signIn(payload: AuthPayload) {

        const response = useFetch<AuthResponse>(config.public.apiBaseUrl + '/login', {
            method: 'POST',
            body: payload
        })

        watch(() => response.status.value, (newValue) => {
            if (newValue === 'success') {
                const token = useCookie('token')
                token.value = response.data.value?.data.token
                isAuthenticated.value = true
                hideSignInModal()
            }
        })

        return response
    }

    return {
        signUp,
        signIn,
        isAuthenticated
    }
})

