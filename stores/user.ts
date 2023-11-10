import { AsyncData } from "nuxt/app"
import { User, UserTasksInterface } from "types"

export const useUser = defineStore('user', () => {
    const user = reactive({ data: {} as User })
    const userTasks = ref({} as UserTasksInterface)

    const isFetching = ref(false)
    const config = useRuntimeConfig()
    const isTasksFetching = ref(false)

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
                await getUserTasks(user.data.username)
                return 0
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
                },
                server: false
            })

        } catch (error) {

            console.log(error)

        } finally {
            isFetching.value = false
        }
    }

    async function getUserTasks(username: string): Promise<AsyncData<UserTasksInterface | null, any | null> | undefined> {

        try {

            const { rToken } = useUserAuth()

            if (rToken) {
                isTasksFetching.value = true

                const res = await useFetch<UserTasksInterface>(config.public.apiBaseUrl + `/users/${username}/tasks`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${rToken}`
                    },
                    server: false
                })
                

                if (res.data.value && res.status.value === 'success') {
                    userTasks.value = res.data.value
                }

                return res
            }

        } catch (error) {

            console.log(error)

        } finally {
            isTasksFetching.value = false
        }
    }

    async function removeUserTask(username: string, taskSlug: string) {
        try {

            const { rToken } = useUserAuth()

            if (rToken) {
                const res = await useFetch(config.public.apiBaseUrl + `/users/${username}/tasks/${taskSlug}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${rToken}`
                    },
                    server: false
                })

                await getUserTasks(username)

                return res
            }

        } catch (error) {

            console.log(error)

        } finally {
        }
    }

    return {
        user,
        getUser,
        userTasks,
        isFetching,
        updateUser,
        getUserTasks,
        removeUserTask,
        isTasksFetching
    }
})

