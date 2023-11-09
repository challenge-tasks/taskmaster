import type { SimplifiedResponseType, TaskDetailsResponse, TaskListResponse } from "types"

export const useTasks = defineStore('tasks', () => {

    const config = useRuntimeConfig()
    const { rToken } = useUserAuth()
    const isFetching = ref<boolean>(false)

    async function fetchTasks(options?: Record<string, any>): Promise<SimplifiedResponseType<TaskListResponse | null>> {

        try {

            const response = await useFetch<TaskListResponse>(config.public.apiBaseUrl + '/tasks', {
                method: 'GET',
                ...options
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

            if (!slug) {
                throw new Error('Provide task slug to get task details')
            }

            const { data, error, status, pending } = await useFetch<TaskDetailsResponse>(config.public.apiBaseUrl + '/tasks/' + slug, {
                method: 'GET'
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

            const res = await useFetch<TaskDetailsResponse>(config.public.apiBaseUrl + `/users/${username}/tasks`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + rToken
                },
                body: {
                    task_id: taskId
                }
            })

            console.log(res) 

            return res.data
            
        } catch (error: any) {

            console.log(error)
            
        } finally {
            isFetching.value = false
        }

    }

    return {
        startTask,
        fetchTasks,
        isFetching,
        fetchTaskDetails
    }
})

