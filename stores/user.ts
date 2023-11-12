import { AsyncData } from "nuxt/app"
import { User, UserTasksInterface } from "types"

export const useUser = defineStore('user', () => {
    const user = reactive({ data: {} as User })
    const userTasks = ref({} as UserTasksInterface)

    const config = useRuntimeConfig()
    const isFetching = ref<boolean>(false)
    const isTasksFetching = ref<boolean>(false)
    const isSolutionUploading = ref<boolean>(false)

    async function getUser(): Promise<void> {
        
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
    
    async function updateUser(data: { username: string, email: string }): Promise<void> {
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

    async function removeUserTask(username: string, taskSlug: string): Promise<AsyncData<string | null, any | null> | undefined> {
        try {

            const { rToken } = useUserAuth()

            if (rToken) {
                const res = await useFetch<string>(config.public.apiBaseUrl + `/users/${username}/tasks/${taskSlug}`, {
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

    async function uploadTaskSolution(taskSlug: string, options: object = {}): Promise<Ref<{ success: boolean } | null> | undefined> {
        try {

            isSolutionUploading.value = true

            const { rToken } = useUserAuth()
            const username = user.data.username

            if (rToken) {
                const res = await useFetch<{ success: boolean }>(config.public.apiBaseUrl + `/users/${username}/tasks/${taskSlug}/solutions`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${rToken}`
                    },
                    ...options,
                    server: false
                })

                return res.data
            }

        } catch (error) {

            console.log(error)

        } finally {
            isSolutionUploading.value = false
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
        isTasksFetching,
        uploadTaskSolution,
        isSolutionUploading
    }
})

