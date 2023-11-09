import { User, UserTasksResponseInterface } from "types"
import { useUserAuth } from './userAuth'

export const useUser = defineStore('user', () => {
    const user = reactive({ data: {} as User })

    const isFetching = ref(false)
    const config = useRuntimeConfig()

    async function getUser() {

        
        try {

            const { rToken } = useUserAuth()
            
            if (!rToken) {
                return false
            }

            isFetching.value = true

            const res = await useFetch<{ data: User }>(config.public.apiBaseUrl + '/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${rToken}`
                },
                server: false
            })

            if (res.status.value === 'success') {
                user.data = res.data.value?.data!
                return 0
            }

            watch(() => res.status.value, (newVal) => {
                if (newVal === 'success') {
                    user.data = res.data.value?.data!
                }
            })

        } catch (error) {

            console.log(error)

        } finally {
            isFetching.value = false
        }
    }
    
    async function updateUser(data: { username: string, email: string }) {
        try {

            const { rToken } = useUserAuth()

            if (!rToken) {
                return false
            }

            isFetching.value = true

            await useFetch<{ data: User }>(config.public.apiBaseUrl + '/profile', {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${rToken}`
                }
            })

        } catch (error) {

            console.log(error)

        } finally {
            isFetching.value = false
        }
    }

    async function getUserTasks(username: string) {

        const defaultResponse = ref<UserTasksResponseInterface>({
            data: [],
            meta: {},
            links: {},
        })
        
        try {

            const { rToken } = useUserAuth()

            if (rToken) {
                isFetching.value = true

                const res = await useFetch<UserTasksResponseInterface>(config.public.apiBaseUrl + `/users/${username}/tasks`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${rToken}`
                    }
                })

                return res.data ?? defaultResponse
            }

        } catch (error) {

            console.log(error)

        } finally {
            isFetching.value = false
        }

        return defaultResponse
    }

    return {
        user,
        getUser,
        updateUser,
        getUserTasks
    }
})

