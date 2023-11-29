export const useCountDownStore = defineStore('countdown-store', () => {

    const isTimedOut = ref<boolean>(false)
    const isTimeExpired = ref<boolean>(false)
    const timeRemain = ref<number | string>('')

    function setTimeRemain(payload: number | string) {
        timeRemain.value = payload
    }

    function setIsTimedOutState(payload: boolean) {
        isTimedOut.value = payload
    }

    function setIsTimeExpired(payload: boolean) {
        isTimeExpired.value = payload
    }

    watch(isTimeExpired, (newVal) => {
        newVal ? isTimedOut.value = true : isTimedOut.value = false
    })

    return {
        isTimedOut,
        timeRemain,
        isTimeExpired,
        setTimeRemain,
        setIsTimeExpired,
        setIsTimedOutState
    }
})