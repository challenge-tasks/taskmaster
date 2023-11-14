import { FetchOptions } from 'ofetch'
import { AsyncData, AsyncDataOptions } from '#app'

import FetchFactory from '@/repository/factory'
import { ITasksList } from 'types'

class TasksModule extends FetchFactory {

    /**
     * Return the all tasks as array
     * @param asyncDataOptions options for `useAsyncData`
     * @param fetchOptions options for `call` method
     * @returns Promise<AsyncData<ITasksList | null, Error | null>>
     */
    async getTasks(asyncDataOptions?: AsyncDataOptions<ITasksList>, fetchOptions?: FetchOptions<'json'> ): Promise<AsyncData<ITasksList | null, Error | null>> {

        return useAsyncData<ITasksList>(() => {

            return this.call<ITasksList>('GET', '/tasks', null, fetchOptions)
        
        }, asyncDataOptions)

    }
}

export default TasksModule