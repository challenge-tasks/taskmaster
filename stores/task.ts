import type { AsyncData } from "nuxt/app"
import type { SimplifiedResponseType, TaskDetailsResponse, ITasksList, ITasksList } from "types"

export const useTasks = defineStore('tasks', () => {

    const { rToken } = useUserAuth()
    const config = useRuntimeConfig()
    
    const isFetching = ref<boolean>(false)
    const isTasksFetching = ref<boolean>(false)
    const isSolutionUploading = ref<boolean>(false)
    
    const userTasks = ref({} as ITasksList)

    async function fetchTasks(options: object = {}): Promise<SimplifiedResponseType<ITasksList | null>> {

        try {

            const response = await useFetch<ITasksList>(config.public.apiBaseUrl + '/tasks', {
                method: 'GET',
                ...options,
            })
            

            return {
                data: response.data.value,
                error: response.error.value,
                status: response.status.value,
                pending: response.pending.value,
            }

        } catch (error: any) {
            console.log(error)

            return {
                data: null,
                error: error,
                pending: false,
                status: 'error'
            }
        }

    }

    async function fetchTaskDetails(slug: string | string[]): Promise<SimplifiedResponseType<TaskDetailsResponse | null>> {

        try {
            
            const headers: any = {}

            if (rToken) {
                headers.Authorization = `Bearer ${rToken}`
            }

            if (!slug) {
                throw new Error('Provide task slug to get task details')
            }

            const { data, error, status, pending } = await useFetch<TaskDetailsResponse>(config.public.apiBaseUrl + '/tasks/' + slug, {
                method: 'GET',
                headers
            })

            return {
                data: data.value,
                error: error.value,
                status: status.value,
                pending: pending.value
            }

        } catch (error: any) {
            
            console.log(error)

            return {
                data: null,
                error: error,
                pending: false,
                status: 'error'
            }
        }
    }

    async function startTask(username: string, taskId: number) {
        
        try {

            isFetching.value = true

            if (!taskId) {
                throw new Error('Provide task id to start this task')
            }

            if (!username) {
                throw new Error('Provide username to start this task')
            }

            console.log(rToken)

            const res = await useFetch<TaskDetailsResponse>(config.public.apiBaseUrl + `/users/${username}/tasks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${rToken}`
                },
                body: {
                    task_id: taskId
                }
            }) 

            return res.data
            
        } catch (error: any) {

            console.log(error)
            
        } finally {
            isFetching.value = false
        }

    }

    async function getUserTasks(username: string): Promise<AsyncData<ITasksList | null, any | null> | undefined> {

        try {

            const { rToken } = useUserAuth()

            if (rToken) {
                isTasksFetching.value = true

                const res = await useFetch<ITasksList>(config.public.apiBaseUrl + `/users/${username}/tasks`, {
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

            const { user } = useUser()
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

                getUserTasks(username)

                return res.data
            }

        } catch (error) {

            console.log(error)

        } finally {
            isSolutionUploading.value = false
        }
    }

    return {
        userTasks,
        isFetching,
        isTasksFetching,
        isSolutionUploading,

        startTask,
        fetchTasks,
        getUserTasks,
        removeUserTask,
        fetchTaskDetails,
        uploadTaskSolution,
    }
})

