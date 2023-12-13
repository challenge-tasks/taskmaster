export const useModalsStore = defineStore('app-modals', () => {
   
    const { setMenuState } = useGlobalStore()
    
    const isEmailModalShown = ref<boolean>(true)
    const isSignupModalShown = ref<boolean>(false)
    const isSigninModalShown = ref<boolean>(false)
    const isRecoveryModalVisible = ref<boolean>(false)
    const isBugReportModalVisible = ref<boolean>(false)
    const isProviderAuthErrorModalVisible = ref<boolean>(false)

    function setSignInModalState(payload: boolean) {
        isSigninModalShown.value = payload

        if (payload) {
            setMenuState(false)
        }
    }

    function setEmailModalState(payload: boolean) {
        isEmailModalShown.value = payload

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

    function setRecoveryModalState(payload: boolean) {
        isRecoveryModalVisible.value = payload
    
        if (payload) {
            setMenuState(false)
        }
    }

    function setProviderAuthErrorModalState(payload: boolean) {
        isProviderAuthErrorModalVisible.value = payload
    
        if (payload) {
            setMenuState(false)
        }
    }

    function setBugReportModalState(payload: boolean) {
        isBugReportModalVisible.value = payload
    
        if (payload) {
            setMenuState(false)
        }
    }

    return {
        isEmailModalShown,
        isSigninModalShown,
        isSignupModalShown,
        isRecoveryModalVisible,
        isBugReportModalVisible,
        isProviderAuthErrorModalVisible,
        setEmailModalState,
        setSignInModalState,
        setSignUpModalState,
        setRecoveryModalState,
        setBugReportModalState,
        setProviderAuthErrorModalState
    }
})