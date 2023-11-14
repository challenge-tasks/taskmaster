import { $fetch, FetchOptions } from 'ofetch'

import TasksModule from '@/repository/modules/task'

interface IApiInstance {
    tasks: TasksModule
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const fetchOptions: FetchOptions = {
        baseURL: config.public.apiBaseUrl
    }

    const apiFecther = $fetch.create(fetchOptions);

    const modules: IApiInstance = {
        tasks: new TasksModule(apiFecther),
    }

    return {
        provide: {
            api: modules
        }
    }
})