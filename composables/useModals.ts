export function useModals() {
    const { setSignInModalState, setSignUpModalState } = useModalsStore()

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

    return {
        showSignupModal,
        hideSignupModal,
        showSigninModal,
        hideSigninModal

    }
}