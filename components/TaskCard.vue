<template>
    <span class="task-card">
        <span class="task-card__img">
            <img :src="taskMainImage" :alt="data.description">
        </span>

        <span class="task-card__middle">

            <span class="mb-2 flex items-center justify-between gap-5">
                <h4 class="task-card__title">{{ data.name }}</h4>
                <span :class="badgeClassesBasedOnDifficultyLevel">{{ data.difficulty }}</span>
            </span>

            <p class="task-card__excerpt">{{ trimText(data.summary, 150) }}</p>
        </span>

        <span v-if="data.stacks" class="task-card__bottom">
            <span class="task-card__tags">
                <span v-for="stack in data.stacks" class="task-card__tag">#{{ stack.name }}</span>
            </span>
        </span>
    </span>
</template>

<script setup lang="ts">
import { getDifficultyLevel, trimText } from '@/utils'

const config = useRuntimeConfig()

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const badgeClassesBasedOnDifficultyLevel = computed(() => {
    const diffLevel = getDifficultyLevel(props.data.difficulty)

    switch (diffLevel) {
        case 0:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-green-50 text-green-500 ring-1 ring-inset ring-green-500 ring-opacity-25'
        case 1:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-cyan-50 text-cyan-500 ring-1 ring-inset ring-cyan-500 ring-opacity-25'
        case 2:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-amber-50 text-amber-500 ring-1 ring-inset ring-amber-500 ring-opacity-25'
        case 3:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-red-50 text-red-500 ring-1 ring-inset ring-red-500 ring-opacity-25'
        case 4:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-indigo-50 text-indigo-500 ring-1 ring-inset ring-indigo-500 ring-opacity-25'
        default:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 ring-1 ring-inset ring-gray-300 text-gray-700 bg-gray-50'
    }
})

const taskMainImage = computed(() => {
    return config.public.baseUrl + '/uploads/' + props.data.image
})

</script>