import { IUser } from "@/types"
import { getCookieExpirationDate } from "@/utils"

export const useUserStore = defineStore('user-store', () => {

    const config = useRuntimeConfig()

    const user = ref({} as IUser)
    const isUserUpdating = ref<boolean>(false)
    const userToken = useCookie<string>('token', { expires: getCookieExpirationDate(+config.public.cookieExpiresAfter) })

    function setUser(payload: IUser) {
        user.value = payload
    }

    function setUserToken(payload: string) {
        userToken.value = payload
    }

    function setUserUpdatingStatus(payload: boolean) {
        isUserUpdating.value = payload
    }

    function logOutUser() {
        userToken.value = ''
        user.value = {} as IUser
    }

    return {
        user,
        setUser,
        userToken,
        logOutUser,
        setUserToken,
        isUserUpdating,
        setUserUpdatingStatus
    }

})