export function useModals() {
    const { setSignInModalState, setSignUpModalState, setRecoveryModalState } = useModalsStore()

    function showSignupModal() {
        setSignUpModalState(true)
    }

    function hideSignupModal() {
        setSignUpModalState(false)
    }

    function showSigninModal() {
        setSignInModalState(true)
    }

    function hideSigninModal() {
        setSignInModalState(false)
    }
    
    function showRecoveryModal() {
        setRecoveryModalState(true)
    }
    
    function hideRecoveryModal() {
        setRecoveryModalState(false)
    }

    return {
        showSignupModal,
        hideSignupModal,
        showSigninModal,
        hideSigninModal,
        hideRecoveryModal,
        showRecoveryModal

    }
}