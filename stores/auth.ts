export const useAuthentication = defineStore('auth', () => {

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

    return { 
        isSignInModalVisible, 
        isSignUpModalVisible,
        toggleSignInModal, 
        toggleSignUpModal 
    }
})

