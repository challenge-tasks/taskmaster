import { FetchOptions } from 'ofetch';
import { AsyncData } from "nuxt/app"
import { IFetchOptions, ITasksResponse } from "types"

export function useTasks() {

    const { $api } = useNuxtApp()
    const { userToken } = storeToRefs(useUserStore())
    const { setTasks, setUserTasks, setTasksFetchingState, setUserTasksFetchingState } = useTaskStore()

    async function getTasks(options?: FetchOptions<'json'>): Promise<AsyncData<ITasksResponse | null, Error | null>> {

        try {

            setTasksFetchingState(true)

            const res = await useAsyncData<ITasksResponse>('tasks', () => $api('/tasks', options))

            if (res.data.value) {
                setTasks(res.data.value.data)
            }

            return res

        } catch (error: any) {
            console.log(error)
            return error
            
        } finally {
            setTasksFetchingState(false)
        }

    }

    async function getUserTasks(options: IFetchOptions = {}): Promise<AsyncData<ITasksResponse | null, Error | null>> {
        try {

            setUserTasksFetchingState(true)

            const username = options?.customParams?.username

            const res = await useAsyncData<ITasksResponse>('user-tasks', () => $api(`/users/${username}/tasks`, { 
                method: 'GET',

                headers: {
                    Authorization: `Bearer ${userToken.value}`
                },

                ...options?.fetcherOptions 
            }))
           
            
            if (res.data.value && res.status.value == 'success') {
                setUserTasks(res.data.value.data)
            }

            return res
            
        } catch (error: any) {
            
            console.log(error)
            return error

        } finally {
            setUserTasksFetchingState(false)
        }
    }

    async function removeUserTask(options: IFetchOptions = {}) {
        try {

            setUserTasksFetchingState(true)

            const username = options?.customParams?.username
            const taskSlug = options?.customParams?.taskSlug

            const res = await useAsyncData('user-tasks', () => $api(`/users/${username}/tasks/${taskSlug}`, { 
                method: 'DELETE',

                headers: {
                    Authorization: `Bearer ${userToken.value}`
                },

                ...options?.fetcherOptions
            }))
           
            
            if (res.data.value && res.status.value == 'success') {
                setUserTasks(res.data.value.data)
            }

            return res
            
        } catch (error: any) {
            
            console.log(error)
            return error

        } finally {
            setUserTasksFetchingState(false)
        }
    }

    return {
        getTasks,
        getUserTasks,
        removeUserTask
    }
}