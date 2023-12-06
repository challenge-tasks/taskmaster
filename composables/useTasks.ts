import type { AsyncData } from "nuxt/app"
import type { FetchOptions } from 'ofetch'
import { IFetchOptions, IStartTaskSuccessResponse, ITaskDetail, ITaskSolutionUploadSuccess, ITasksResponse } from "types"

export function useTasks() {

    const { $api } = useNuxtApp()
    const { userToken } = storeToRefs(useUserStore())
    const { 
        setTasks, 
        setUserTasks, 
        setTaskStartingState, 
        setTasksFetchingState,
        setTaskUploadingStatus, 
        setUserTasksFetchingState 
    } = useTaskStore()

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

    async function getTaskDetail(options: IFetchOptions): Promise<AsyncData<ITaskDetail | null, Error | null>> {

        try {

            const slug = options.customParams?.slug

            if (userToken.value) {
                if (!options.fetcherOptions) {
                    options.fetcherOptions = {}
                }

                options.fetcherOptions.headers = {
                    Authorization: `Bearer ${userToken.value}`
                }
            }
            
            const res = await useAsyncData<ITaskDetail>('tasks', () => $api(`/tasks/${slug}`, { ...options.fetcherOptions }))

            return res
            
        } catch (error: any) {
            console.log(error)
            return error
        }
        
    }

    async function uploadSolution(options: IFetchOptions): Promise<AsyncData<ITaskSolutionUploadSuccess | null, Error | null>> {
        
        try {

            setTaskUploadingStatus(true)
            
            const slug = options?.customParams?.slug
            const username = options?.customParams?.username

            const res = await useAsyncData<ITaskSolutionUploadSuccess>('task-uploading', () => $api(`/users/${username}/tasks/${slug}/solutions`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken.value}`
                },
                ...options.fetcherOptions
            }))
            
            return res
            
        } catch (error: any) {
            
            console.log(error)
            return error

        } finally {
            setTaskUploadingStatus(false)
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

    async function startTask(options: IFetchOptions= {}): Promise<AsyncData<IStartTaskSuccessResponse | null, Error | null>> {
        try {
            setTaskStartingState(true)

            const username = options.customParams?.username
            const res = await useAsyncData<IStartTaskSuccessResponse>('start-task', () => $api(`/users/${username}/tasks`, { 
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken.value}`
                },
                ...options.fetcherOptions
            }))

            return res
            
        } catch (error: any) {
            console.log(error)
            return error
        } finally {
            setTaskStartingState(false)
        }
    }

    return {
        getTasks,
        startTask,
        getUserTasks,
        getTaskDetail,
        removeUserTask,
        uploadSolution
    }
}