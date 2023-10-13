import { TaskType } from "types"

export const useTasks = defineStore('tasks', () => {

    const config = useRuntimeConfig()

    async function fetchTasks(options?: Record<string, any>) {

        try {

            const response = await useFetch<Array<TaskType>>(config.public.apiBaseUrl + '/tasks', {
                method: 'GET',
                body: options
            })

            return {
                error: response.error.value,
                status: response.status.value,
                pending: response.pending.value,
                data: response.data.value?.data
            }

        } catch (error) {
            console.log(error)
        }

    }

    async function fetchTaskDetails(slug: string | string[]) {

        if (!slug) {
            throw new Error('Provide task slug to get task details')
        }

        try {

            const { data, error, status, pending } = await useFetch<TaskType>(config.public.apiBaseUrl + '/tasks/' + slug, {
                method: 'GET'
            })

            return {
                data: data.value,
                error: error.value,
                status: status.value,
                pending: pending.value
            }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchTasks,
        fetchTaskDetails
    }
})

