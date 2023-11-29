<template>
    <span class="flex flex-col lg:flex-row user-task">

        <span class="lg:mr-3 flex-shrink-0 w-full lg:w-56 sm:max-h-36 overflow-hidden">
            <img :src="taskImage" />
        </span>
        
        <span class="lg:px-0 px-2 py-2">
            <NuxtLink :to="'/task/' + task.slug" class="inline-block font-medium hover:text-blue-600 mb-1">{{ task.name }}</NuxtLink>
            <p class="text-slate-500 md:text-sm max-w-lg">{{ trimText(task.summary, 135) }}</p>
        </span>

        <span class="lg:ml-auto w-full sm:w-auto flex lg:flex-col items-center lg:items-start justify-between p-2">
            
            <UBadge class="lg:ml-auto rounded-full" variant="subtle">{{ $t(`task.status.${[task.status]}`) }}</UBadge>
            
            <span class="flex self-end gap-2">
                <UTooltip v-if="hasRateOrComment" :text="rateInfoTooltipContent.text" :popper="{ arrow: true, placement: 'top' }">
                    <UButton @click="onRateInfoRequest" size="xs" variant="soft" icon="i-octicon-info-16" class="rounded-md" />
                </UTooltip>
                
                <UTooltip :text="uploadTooltipContent.text" :popper="{ arrow: true, placement: 'top' }">
                    <UButton @click="emitUploadTask" :disabled="isTaskReviewing || isTaskDone" size="xs" variant="soft" icon="i-octicon-upload-16" class="rounded-md" />
                </UTooltip>

                <UTooltip :text="deleteTooltipContent.text" :popper="{ arrow: true, placement: 'top' }">
                    <UButton @click="deleteTask" size="xs" variant="soft" icon="i-octicon-trash-16" class="rounded-md" />
                </UTooltip>
            </span>
            
        </span>
    </span>
</template>

<script setup lang="ts">
import { trimText } from '@/utils'
import type { ITaskType } from '@/types'

const toast = useToast()
const config = useRuntimeConfig()
const { user } = storeToRefs(useUserStore())
const { removeUserTask, getUserTasks } = useTasks()

const emit = defineEmits<{ 
    'solution-upload': any
    'review-request': any
}>()

const props = defineProps({
    task: {
        required: true,
        type: Object as PropType<ITaskType>
    }
})

const uploadTooltipContent = computed(() => {
    
    if (isTaskReviewing.value) {
        return { 
            text: 'Ваше решение находится на проверке'
        }
    }

    if (isTaskDone.value) {
        return { 
            text: 'Вы уже получили обратную связь для своего решения'
        }
    }
    
    return { 
        text: 'Загрузите свою работу для проверки'
    }
})

const deleteTooltipContent = computed(() => {
    return { 
        text: 'Удалить задачу'
    }
})

const rateInfoTooltipContent = computed(() => {
    return {
        text: 'Посмотреть оценку и замечания'
    }
})

const hasRateOrComment = computed(() => {
    return props.task.comment || props.task.rating
})

const isTaskReviewing = computed(() => {
    return props.task.status === 'reviewing'
})

const isTaskDone = computed(() => {
    return props.task.status === 'done'
})

const taskImage = computed(() => {
    return config.public.baseUrl + '/uploads/' + props.task.image
})

function onRateInfoRequest() {
    emit('review-request', { comment: props.task.comment!, rating: props.task.rating! })
}

async function deleteTask() {
    const username = user.value.username
    const res = await removeUserTask({ customParams: { username, taskSlug: props.task.slug } })

    if (!res.error.value && res.status.value === 'success') {

        await getUserTasks({ customParams: { username: user.value.username } })

        toast.add({ 
            title: 'Задача успешно удалена из профиля пользователя',
            closeButton: { variant: 'ghost' } 
        })
    }

}

async function emitUploadTask() {
    if (!isTaskReviewing.value || isTaskDone.value) {
        emit('solution-upload', props.task.slug)
    }
}

</script>