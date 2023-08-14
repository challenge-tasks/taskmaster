export const useAuthModals = defineStore('authModal', () => {

    let isSignInModalVisible = ref(false)
    let isSignUpModalVisible = ref(false)

    function toggleSignInModal() {
        isSignUpModalVisible.value = false
        isSignInModalVisible.value = !isSignInModalVisible.value
    }

    function toggleSignUpModal() {
        isSignInModalVisible.value = false
        isSignUpModalVisible.value = !isSignUpModalVisible.value
    }

    function hideSignUpModal() {
        isSignUpModalVisible.value = false
    }
    
    function hideSignInModal() {
        isSignUpModalVisible.value = false
    }

    return { 
        isSignInModalVisible, 
        isSignUpModalVisible,
        toggleSignInModal, 
        toggleSignUpModal, 
        hideSignUpModal,
        hideSignInModal
    }
})

