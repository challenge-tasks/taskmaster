import { SimplifiedResponseType, TaskDetailsResponse, TaskListResponse, TaskType } from "types"

export const useTasks = defineStore('tasks', () => {

    const config = useRuntimeConfig()

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

    return {
        fetchTasks,
        fetchTaskDetails
    }
})

