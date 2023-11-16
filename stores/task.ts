import { ITaskType } from "types"

export const useTaskStore = defineStore('task-store', () => {
    const tasks = ref([] as ITaskType[])

    const limitedTasks = computed(() => {
        return tasks.value.slice(0, 8)
    })

    function setTasks(payload: ITaskType[]) {
        tasks.value = payload
    }

    return {
        tasks,
        setTasks,
        limitedTasks
    }
})