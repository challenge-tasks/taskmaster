import { ITaskType, IUser } from "types"

export const useUserStore = defineStore('user-store', () => {

    const user = ref({} as IUser)
    const userToken = useCookie<string>('token')
    
    const isUserUpdating = ref<boolean>(false)

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