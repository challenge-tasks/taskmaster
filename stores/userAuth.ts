import { AuthPayload, AuthResponse } from "types"

export const useUserAuth = defineStore('userAuth', () => {
    const isFetching = ref(false)
    const token = useCookie('token')
    const config = useRuntimeConfig()
    const isAuthenticated = ref(false)
    const hasToken = ref<boolean>(false)

    if (token.value) {
        isAuthenticated.value = true
        hasToken.value = true
    }

    const { hideSignUpModal, hideSignInModal } = useAuthModals()

    async function signUp(payload: AuthPayload) {

        try {

            isFetching.value = true

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
            
        } catch (error) {
        
            console.log(error)
        
        } finally {
            isFetching.value = false   
        }
    }

    async function signIn(payload: AuthPayload) {

        try {

            isFetching.value = true

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

        } catch (error) {

            console.log(error)

        } finally {

            isFetching.value = false

        }
    }

    return {
        signUp,
        signIn,
        hasToken,
        isFetching,
        isAuthenticated
    }
})

