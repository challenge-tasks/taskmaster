<template>
    <span class="flex flex-col sm:flex-row user-task">

        <span class="mr-3 flex-shrink-0 w-full sm:w-40 sm:max-h-32 overflow-hidden">
            <img :src="taskImage" />
        </span>
        
        <span class="sm:px-0 px-2 py-2">
            <NuxtLink :to="'/task/' + task.slug" class="inline-block font-medium hover:text-blue-600 mb-1">{{ task.name }}</NuxtLink>
            <p class="text-slate-500 max-w-lg">{{ trimText(task.summary, 135) }}</p>
        </span>

        <span class="sm:ml-auto w-full sm:w-auto flex flex-col justify-between p-2">
            <span class="inline-flex items-center bg-blue-400 py-1 px-2 rounded-md">
                <span class="text-white font-medium text-xs leading-none">{{ $t(`task.status.${[task.status]}`) }}</span>
            </span>
            <span class="flex self-end gap-2">
                <span @click="uploadTask" title="Загрузить работу" class="flex justify-center sm:inline-block py-2 sm:px-2 sm:py-1 cursor-pointer rounded bg-slate-50 hover:bg-slate-200">
                    <Icon name="octicon:upload-16" class="btn__icon text-slate-500" />
                </span>
                <span @click="deleteTask" title="Удалить задание" class="flex justify-center sm:inline-block py-2 sm:px-2 sm:py-1 cursor-pointer rounded bg-slate-50 hover:bg-slate-200">
                    <Icon name="octicon:trash-16" class="btn__icon text-slate-500" />
                </span>
            </span>
        </span>
    </span>
</template>

<script setup lang="ts">
import { trimText } from '@/utils'

interface TaskPropsTypes {
    task: TaskType
}

const config = useRuntimeConfig()
const { user, removeUserTask } = useUser()

const props = defineProps({
    task: {
        required: true,
        type: Object as PropType<TaskType>
    }
})

const taskImage = computed(() => {
    return config.public.baseUrl + '/uploads/' + props.task.image
})

const taskSummary = computed(() => {
    return 
})

async function deleteTask() {
    const username = user.data.username
    await removeUserTask(username, props.task.slug)
}

async function uploadTask() {
    
}

</script>