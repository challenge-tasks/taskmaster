import type { ITaskType } from "@/types"

export const useTaskStore = defineStore('task-store', () => {
    
    const tasks = ref([] as ITaskType[])
    const userTasks = ref([] as ITaskType[])
    const isTaskStarting = ref<boolean>(false)
    const isTasksFetching = ref<boolean>(false)
    const isUserTasksFetching = ref<boolean>(false)
    const isTaskSolutionUploading = ref<boolean>(false)

    const limitedTasks = computed(() => {
        return tasks.value.slice(0, 8)
    })

    function setUserTasksFetchingState(payload: boolean) {
        isUserTasksFetching.value = payload
    }

    function setTasksFetchingState(payload: boolean) {
        isTasksFetching.value = payload
    }

    function setTaskStartingState(payload: boolean) {
        isTaskStarting.value = payload
    }

    function setTaskUploadingStatus(payload: boolean) {
        isTaskSolutionUploading.value = payload
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
        isTaskStarting,
        isTasksFetching,
        isUserTasksFetching,
        setTaskStartingState,
        setTasksFetchingState,
        setTaskUploadingStatus,
        isTaskSolutionUploading,
        setUserTasksFetchingState
    }
    
})