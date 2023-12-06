<template>
    <span class="task-card">
        <span class="task-card__img">
            <UnLazyImage :placeholder-src="placeholderImage" width="340" height="210" :src-set="taskMainImage" />
        </span>

        <span class="task-card__middle">

            <span class="mb-2 flex items-center justify-between gap-5">
                <h4 class="task-card__title">{{ data.name }}</h4>
                <span :class="badgeClassesBasedOnDifficultyLevel(data.difficulty)">{{ data.difficulty }}</span>
            </span>

            <p class="task-card__excerpt">{{ trimText(data.summary, 150) }}</p>
        </span>

        <span v-if="data.stacks" class="task-card__bottom">
            <span class="task-card__tags">
                <span v-for="tag in data.tags" class="task-card__tag">#{{ tag.name }}</span>
            </span>
        </span>
    </span>
</template>

<script setup lang="ts">
import placeholderImage from '@/assets/images/preloader.jpg'
import { badgeClassesBasedOnDifficultyLevel, trimText } from '@/utils'

const config = useRuntimeConfig()

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const taskMainImage = computed(() => {
    return config.public.baseUrl + '/uploads/resize/' + props.data.image + '/340x225'
})

</script>