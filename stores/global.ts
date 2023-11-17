export const useGlobalStore = defineStore('global-store', () => {

    const isMenuActive = ref<boolean>(false)

    function setMenuState(payload: boolean) {
        isMenuActive.value = payload
    }

    return {
        isMenuActive,
        setMenuState
    }
})