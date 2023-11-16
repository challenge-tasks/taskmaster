import { FetchOptions } from 'ofetch';
import { AsyncData } from "nuxt/app"
import { ITasksResponse } from "types"

export function useTasks() {

    const { $api } = useNuxtApp()
    const { setTasks } = useTaskStore()
    const isTasksFetching = ref<boolean>(false)

    async function getTasks(options?: FetchOptions<'json'>): Promise<AsyncData<ITasksResponse | null, Error | null>> {

        try {

            isTasksFetching.value = true

            const res = await useAsyncData<ITasksResponse>('tasks', () => $api('/tasks', options))

            if (res.data.value) {
                setTasks(res.data.value.data)
            }

            return res

        } catch (error: any) {
            console.log(error)
            return error
            
        } finally {
            isTasksFetching.value = false
        }

    }

    return {
        getTasks,
        isTasksFetching
    }
}