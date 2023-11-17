export const useModalsStore = defineStore('app-modals', () => {
   
    const { setMenuState } = useGlobalStore()
    
    const isSignupModalShown = ref<boolean>(false)
    const isSigninModalShown = ref<boolean>(false)

    function setSignInModalState(payload: boolean) {
        isSigninModalShown.value = payload

        if (payload) {
            setMenuState(false)
        }
    }

    function setSignUpModalState(payload: boolean) {
        isSignupModalShown.value = payload
        
        if (payload) {
            setMenuState(false)
        }
    }

    return {
        isSigninModalShown,
        isSignupModalShown,
        setSignInModalState,
        setSignUpModalState
    }
})