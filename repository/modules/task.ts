import { FetchOptions } from 'ofetch'
import { AsyncData, AsyncDataOptions } from '#app'

import FetchFactory from '../factory'
import { ITasksList } from 'types'

class TasksModule extends FetchFactory {

    /**
     * Return the all tasks as array
     * @param asyncDataOptions options for `useAsyncData`
     * @returns
     */
    async getTasks(asyncDataOptions?: AsyncDataOptions<ITasksList>): Promise<AsyncData<ITasksList | null, Error | null>> {

        return useAsyncData<ITasksList>(() => {
            const fetchOptions: FetchOptions<'json'> = {}

            return this.call<ITasksList>('GET', '/tasks', null, fetchOptions)
        }, asyncDataOptions)

    }
}

export default TasksModule