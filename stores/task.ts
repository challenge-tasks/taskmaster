import { ITaskType } from "types"

export const useTaskStore = defineStore('task-store', () => {
    
    const tasks = ref([] as ITaskType[])
    const userTasks = ref([] as ITaskType[])
    const isTasksFetching = ref<boolean>(false)
    const isUserTasksFetching = ref<boolean>(false)

    const limitedTasks = computed(() => {
        return tasks.value.slice(0, 8)
    })

    function setUserTasksFetchingState(payload: boolean) {
        isUserTasksFetching.value = payload
    }

    function setTasksFetchingState(payload: boolean) {
        isTasksFetching.value = payload
    }

    function setTasks(payload: ITaskType[]) {
        tasks.value = payload
    }

    function setUserTasks(payload: ITaskType[]) {
        userTasks.value = payload
    }

    return {
        tasks,
        setTasks,
        userTasks,
        setUserTasks,
        limitedTasks,
        isTasksFetching,
        isUserTasksFetching,
        setTasksFetchingState,
        setUserTasksFetchingState
    }
    
})