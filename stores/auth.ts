export const useAuthStore = defineStore('auth-store', () => {

    const { userToken } = storeToRefs(useUserStore())

    const isAuthorizing = ref<boolean>(false)
    const isAuthenticated = ref<boolean>(false)

    if (userToken.value) {
        isAuthenticated.value = true
    }

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