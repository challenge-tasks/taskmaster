export const useCountDownStore = defineStore('countdown-store', () => {

    const isTimedOut = ref<boolean>(false)
    const timeRemain = ref<number | string>('')

    function setTimeRemain(payload: number | string) {
        timeRemain.value = payload
    }

    function setIsTimedOutState(payload: boolean) {
        isTimedOut.value = payload
    }

    return {
        isTimedOut,
        timeRemain,
        setTimeRemain,
        setIsTimedOutState
    }
})