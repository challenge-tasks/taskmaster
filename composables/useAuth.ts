import { AsyncData } from "nuxt/app"
import { IAuthPayload, IAuthResponse, IUser, ISimpleSuccessResponse, IPasswordRecoveryBody, IBaseErrorResponse } from "types"

export function useAuth() {
    
    const { $api } = useNuxtApp()
    const config = useRuntimeConfig()

    const { setUser, setUserToken } = useUserStore()
    const { userToken } = storeToRefs(useUserStore())
    const { setSignUpModalState, setSignInModalState } = useModalsStore()
    const { setAuthenticatedState, setAuthorizingState, setRecoveryRequesting } = useAuthStore()

    async function signUp(payload: IAuthPayload): Promise<AsyncData<IAuthResponse | null, IBaseErrorResponse | null>> {

        try {

            setAuthorizingState(true)

            const res = await useAsyncData<IAuthResponse, IBaseErrorResponse>('register', () => $api('/register', { method: 'POST', body: { ...payload } }))

            if (res.data.value && res.status.value === 'success') {
                setSignUpModalState(false)
                setAuthenticatedState(true)
                setUser(res.data.value.data.user)
                setUserToken(res.data.value.data.token)
            }

            return res

        } catch (error: any) {

            console.log(error)
            return error

        } finally {
            setAuthorizingState(false)
        }
    }

    async function signIn(payload: IAuthPayload): Promise<AsyncData<IAuthResponse | null, IBaseErrorResponse | null>> {

        try {

            setAuthorizingState(true)

            const res = await useAsyncData<IAuthResponse, IBaseErrorResponse>('login', () => $api('/login', { method: 'POST', body: { ...payload } }))

            if (res.data.value && res.status.value === 'success') {
                setSignInModalState(false)
                setAuthenticatedState(true)
                setUser(res.data.value.data.user)
                setUserToken(res.data.value.data.token)
            }

            return res

        } catch (error: any) {

            console.log(error)
            return error

        } finally {
            setAuthorizingState(false)
        }
    }

    async function requestPasswordRecovery(email: string): Promise<AsyncData<ISimpleSuccessResponse | null, IBaseErrorResponse | null>>  {
        
        try {
            
            setRecoveryRequesting(true)

            const res = await useAsyncData<ISimpleSuccessResponse, IBaseErrorResponse>('password-recovery-request', () => $api('/password-recovery', { 
                method: 'GET', 
                params: {
                    email
                }
            }))

            return res
            
        } catch (error: any) {
            
            console.log(error)
            return error

        } finally {
            setRecoveryRequesting(false)
        }

    }

    async function changePassword(payload: IPasswordRecoveryBody ): Promise<AsyncData<ISimpleSuccessResponse | null, IBaseErrorResponse | null>> {

        try {
            
            setRecoveryRequesting(true)

            const res = await useAsyncData<ISimpleSuccessResponse, IBaseErrorResponse>('password-recovery', () => $api('/password-recovery', {
                method: 'POST', 
                body: {
                    ...payload
                }
            }))

            return res
            
        } catch (error: any) {
            
            console.log(error)
            return error

        } finally {
            setRecoveryRequesting(false)
        }

    }

    async function logOut(): Promise<AsyncData<unknown | null, Error | null>> {

        const router = useRouter()

        const res = await useFetch(config.public.apiBaseUrl + '/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userToken.value}`
            },
            server: false
        })

        if (res.status.value === 'success') {
            setUserToken('')
            setUser({} as IUser)
            setAuthenticatedState(false)
        }

        router.push('/')

        return res
    }

    return {
        logOut,
        signUp,
        signIn,
        changePassword,
        requestPasswordRecovery
    }
}

