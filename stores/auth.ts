export const useAuthStore = defineStore('auth-store', () => {

    const { userToken } = storeToRefs(useUserStore())

    const isLoggingOut = ref<boolean>(false)
    const isAuthorizing = ref<boolean>(false)
    const isAuthenticated = ref<boolean>(false)
    const isRecoveryRequesting = ref<boolean>(false)

    if (userToken.value) {
        isAuthenticated.value = true
    }

    function setAuthenticatedState(payload: boolean) {
        isAuthenticated.value = payload
    }

    function setAuthorizingState(payload: boolean) {
        isAuthorizing.value = payload
    }

    function setRecoveryRequesting(payload: boolean) {
        isRecoveryRequesting.value = payload
    }

    function setLoggingOutState(payload: boolean) {
        isLoggingOut.value = payload
    }

    return {
        isLoggingOut,
        isAuthorizing,
        isAuthenticated,
        isRecoveryRequesting,
        setLoggingOutState,
        setAuthorizingState,
        setAuthenticatedState,
        setRecoveryRequesting
    }
})