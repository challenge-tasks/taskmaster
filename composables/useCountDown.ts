export function useCountdown() {

    const appConfig = useRuntimeConfig()
    const timeout = +appConfig.public.emailVerificationInterval

    let timer: any = null
    const countdownDurationInSeconds = timeout * 60 // 2 minutes * 60 seconds

    const { setTimeRemain, setIsTimedOutState } = useCountDownStore()

    function startCountdown(fromTime: number) {

        let currentTimeUnixTimestamp = Math.floor(new Date().getTime() / 1000)
        let timeDifference = currentTimeUnixTimestamp - fromTime

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
                }
            }

        }, 1000)

        if (timeDifference < countdownDurationInSeconds) {
            setIsTimedOutState(false)
        } else {
            setIsTimedOutState(true)
        }
    }


    return {
        startCountdown
    }
}