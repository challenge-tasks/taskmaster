export const useGlobalStore = defineStore('global-store', () => {

    const isMenuActive = ref<boolean>(false)
    const isBugReporting = ref<boolean>(false)

    function setMenuState(payload: boolean) {
        isMenuActive.value = payload
    }

    function setBugReportingState(payload: boolean) {
        isBugReporting.value = payload
    }

    return {
        isMenuActive,
        isBugReporting,
        setMenuState,
        setBugReportingState
    }
})