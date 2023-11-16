export const useAuthStore = defineStore('auth-store', () => {

    const isAuthorizing = ref<boolean>(false)
    const isAuthenticated = ref<boolean>(false)

    function setAuthenticatedState(payload: boolean) {
        isAuthenticated.value = payload
    }

    function setAuthorizingState(payload: boolean) {
        isAuthorizing.value = payload
    }

    return {
        isAuthorizing,
        isAuthenticated,
        setAuthorizingState,
        setAuthenticatedState
    }
})