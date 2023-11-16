export const useModalsStore = defineStore('app-modals', () => {
    
    const isSignupModalShown = ref<boolean>(false)
    const isSigninModalShown = ref<boolean>(false)

    function setSignInModalState(payload: boolean) {
        isSigninModalShown.value = payload
    }

    function setSignUpModalState(payload: boolean) {
        isSignupModalShown.value = payload
    }

    return {
        isSigninModalShown,
        isSignupModalShown,
        setSignInModalState,
        setSignUpModalState
    }
})