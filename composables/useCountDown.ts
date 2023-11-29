export function useCountDown() {

    const { timeRemain } = storeToRefs(useCountDownStore())
    const { setTimeRemain, setIsTimeExpired } = useCountDownStore() 

    const currentTime = ref<number>(0)
    const countDownTime = ref<number>(5) // time in minutes
    const timeDifference = ref<number>(0)
    const duration = ref<number>(countDownTime.value * 60) // 5 minutes in seconds

    function startTimer(lastConfirmationTime: number) {

        const updateTimer = () => {
            currentTime.value = Math.floor(new Date().getTime() / 1000)
            timeDifference.value = currentTime.value - lastConfirmationTime

            if (timeDifference.value < duration.value) {
                const remainingTime = duration.value - timeDifference.value
                start(remainingTime)
            }
        }
        
        updateTimer()

        if (timeDifference.value >= duration.value) {
            setIsTimeExpired(true)
        } else {
            setIsTimeExpired(false)
        }

        // Update timer every 1000 milliseconds
        setInterval(() => {
            updateTimer()
        }, 1000)
    }

    function start(remainingTime: number) {
        const timerInterval = 1000 // update interval of timer in milliseconds

        const timer = setInterval(() => {
            let minutes: string | number = Math.floor(remainingTime / 60)
            let seconds: string | number = remainingTime % 60

            minutes = minutes < 10 ? '0' + minutes : minutes
            seconds = seconds < 10 ? '0' + seconds : seconds

            setTimeRemain(`${minutes}:${seconds}`)

            remainingTime -= 1

            if (remainingTime < 0) {
                clearInterval(timer)
            }
            
        }, timerInterval)
    }

    watch(timeRemain, (newVal) => {
        if (newVal === '00:00' || newVal === '') {
            setIsTimeExpired(true)
        }
    })

    return {
        startTimer
    }
}