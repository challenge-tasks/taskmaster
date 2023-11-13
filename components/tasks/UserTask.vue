<template>
    <span class="flex flex-col sm:flex-row user-task">

        <span class="mr-3 flex-shrink-0 w-full sm:w-40 sm:max-h-32 overflow-hidden">
            <img :src="taskImage" />
        </span>
        
        <span class="sm:px-0 px-2 py-2">
            <NuxtLink :to="'/task/' + task.slug" class="inline-block font-medium hover:text-blue-600 mb-1">{{ task.name }}</NuxtLink>
            <p class="text-slate-500 max-w-lg">{{ trimText(task.summary, 135) }}</p>
        </span>

        <span class="sm:ml-auto w-full sm:w-auto flex flex-col items-start justify-between p-2">
            <span class="inline-flex items-center bg-blue-400 ml-auto py-1 px-2 rounded-md">
                <span class="text-white font-medium text-xs leading-none">{{ $t(`task.status.${[task.status]}`) }}</span>
            </span>
            <span class="flex self-end gap-2">
                <span v-if="hasRateAndComment" @click="onRateInfoRequest" v-tooltip="rateInfoTooltipContent" class="flex justify-center sm:inline-block py-2 sm:px-2 sm:py-1 cursor-pointer rounded bg-slate-50 hover:bg-slate-200">
                    <Icon name="octicon:info-16" class="btn__icon text-slate-500" />
                </span>
                <span @click="emitUploadTask" v-tooltip="uploadTooltipContent" class="flex justify-center sm:inline-block py-2 sm:px-2 sm:py-1 cursor-pointer rounded bg-slate-50 hover:bg-slate-200">
                    <Icon name="octicon:upload-16" class="btn__icon text-slate-500" />
                </span>
                <span @click="deleteTask" v-tooltip="deleteTooltipContent" class="flex justify-center sm:inline-block py-2 sm:px-2 sm:py-1 cursor-pointer rounded bg-slate-50 hover:bg-slate-200">
                    <Icon name="octicon:trash-16" class="btn__icon text-slate-500" />
                </span>
            </span>
        </span>
    </span>
</template>

<script setup lang="ts">
import { TaskType } from 'types'
import { trimText } from '@/utils'

const { user } = useUser()
const config = useRuntimeConfig()
const { removeUserTask } = useTasks()
const emit = defineEmits<{ (e: 'solution-upload', taskSlug: string): void }>()

const props = defineProps({
    task: {
        required: true,
        type: Object as PropType<TaskType>
    }
})

const uploadTooltipContent = computed(() => {
    return { 
        content: 'Загрузите свою работу для проверки', 
        placement: 'bottom' 
    }
})

const deleteTooltipContent = computed(() => {
    return { 
        content: 'Удалить задачу', 
        placement: 'bottom' 
    }
})

const rateInfoTooltipContent = computed(() => {
    return { 
        content: 'Посмотреть оценку и замечания', 
        placement: 'bottom' 
    }
})

const hasRateAndComment = computed(() => {
    return props.task.comment && props.task.rating
})

const taskImage = computed(() => {
    return config.public.baseUrl + '/uploads/' + props.task.image
})

function onRateInfoRequest() {

}

async function deleteTask() {
    const username = user.data.username
    await removeUserTask(username, props.task.slug)
}

async function emitUploadTask() {
    emit('solution-upload', props.task.slug)
}

</script>