import { AuthPayload, AuthResponse, User } from "types"

export const useUserAuth = defineStore('userAuth', () => {
    const token = useCookie('token')
    const rToken = ref(token.value)
    const config = useRuntimeConfig()
    const hasToken = ref<boolean>(false)
    const isFetching = ref<boolean>(false)
    const isAuthenticated = ref<boolean>(false)

    if (token.value) {
        hasToken.value = true
        isAuthenticated.value = true
    }

    const { getUser } = useUser()
    const { hideSignUpModal, hideSignInModal } = useAuthModals()

    async function signUp(payload: AuthPayload) {

        try {

            isFetching.value = true

            const response = await useFetch<AuthResponse>(config.public.apiBaseUrl + '/register', {
                method: 'POST',
                body: payload,
                server: false
            })   

            if (response.status.value === 'success') {
                isAuthenticated.value = true

                token.value = response.data.value?.data.token
                rToken.value = response.data.value?.data.token
                
                hasToken.value = true
                
                hideSignUpModal()

                getUser()
            }
            
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

            const response = await useFetch<AuthResponse>(config.public.apiBaseUrl + '/login', {
                method: 'POST',
                body: payload,
                server: false
            })
    
            if (response.status.value === 'success') {
                
                token.value = response.data.value?.data.token
                rToken.value = response.data.value?.data.token
                
                hasToken.value = true
                isAuthenticated.value = true
                
                hideSignInModal()

                getUser()
            }
            
    
            return response

        } catch (error) {

            console.log(error)

        } finally {

            isFetching.value = false

        }
    }

    async function logOut() {

        const router = useRouter()
        const { user } = useUser()

        const res = await useFetch(config.public.apiBaseUrl + '/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.value}`
            },
            server: false
        })

        if (res.status.value === 'success') {
            token.value = null
            rToken.value = null
            user.data = {} as User
            hasToken.value = false
            isAuthenticated.value = false   
        }
    
        router.push('/')
    }
 
    return {
        logOut,
        signUp,
        signIn,
        token,
        rToken,
        hasToken,
        isFetching,
        isAuthenticated
    }
})

