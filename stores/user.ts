import { AsyncData } from "nuxt/app"
import { User } from "types"

export const useUser = defineStore('user', () => {
    const user = reactive({ data: {} as User })

    const appConfig = useRuntimeConfig()
    const isFetching = ref<boolean>(false)

    const { getUserTasks } = useTasks()

    async function getUser(): Promise<void | boolean> {
        
        try {

            const { rToken } = useUserAuth()
            
            if (!rToken) {
                return false
            }

            isFetching.value = true

            const res = await useFetch<{ data: User }>(appConfig.public.apiBaseUrl + '/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${rToken}`
                },
                server: false
            })

            if (res.status.value === 'success') {
                user.data = res.data.value?.data!
                await getUserTasks(user.data.username)
            }

            watch(() => res.status.value, async (newVal) => {
                if (newVal === 'success') {
                    user.data = res.data.value?.data!
                    await getUserTasks(user.data.username)
                }
            })

        } catch (error) {

            console.log(error)

        } finally {
            isFetching.value = false
        }
    }
    
    async function updateUser(data: { username: string, email: string }): Promise< string | boolean> {
        try {

            const { rToken } = useUserAuth()

            if (!rToken) {
                return false
            }

            isFetching.value = true

            const res = await useFetch<{ data: User }>(appConfig.public.apiBaseUrl + '/profile', {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${rToken}`
                },
                server: false
            })

            return res.status.value

        } catch (error) {

            console.log(error)

        } finally {
            isFetching.value = false
        }
    }

    return {
        user,
        getUser,
        isFetching,
        updateUser
    }
})

