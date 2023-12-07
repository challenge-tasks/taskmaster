export function useCountdown() {

    const appConfig = useRuntimeConfig()
    const timeout = +appConfig.public.emailVerificationInterval

    let timer: any = null
    const isCountdownRunning = ref(false)
    const countdownDurationInSeconds = timeout * 60 // 5 minutes * 60 seconds

    const { setTimeRemain, setIsTimedOutState } = useCountDownStore()

    function startCountdown(fromTime: number) {
        
        let currentTimeUnixTimestamp = Math.floor(new Date().getTime() / 1000)
        let timeDifference = currentTimeUnixTimestamp - fromTime

        if (!isCountdownRunning.value) {
            isCountdownRunning.value = true
        }

        if (timer) {
            clearInterval(timer)
            timer = null
        }
        
        timer = setInterval(() => {
            let currentTimeUnixTimestamp = Math.floor(new Date().getTime() / 1000)
            let timeDifference = currentTimeUnixTimestamp - fromTime

            if (timeDifference <= countdownDurationInSeconds) {
                let remainingTime = countdownDurationInSeconds - timeDifference
                let minutes: string | number = Math.floor(remainingTime / 60)
                let seconds: string | number = remainingTime % 60
                
                minutes < 10 ? minutes = '0' + minutes : minutes
                seconds < 10 ? seconds = '0' + seconds : minutes

                remainingTime -= 1

                setTimeRemain(`${minutes}:${seconds}`)

                if (remainingTime < 0) {
                    clearInterval(timer)
                    setIsTimedOutState(true)
                    isCountdownRunning.value = false
                }
            }

        }, 1000)

        if (timeDifference < countdownDurationInSeconds) {
            setIsTimedOutState(false)
        } else {
            // setTimeout(() => {
                setIsTimedOutState(true)
            // }, 1000)
        }
    }


    return {
        startCountdown
    }
}