<template>
    <span class="task-card">
        <span class="task-card__img">
            <img :src="taskMainImage" :alt="data.description">
        </span>

        <span class="task-card__middle">

            <span class="mb-2 flex items-center justify-between gap-5">
                <h4 class="task-card__title">{{ data.name }}</h4>
                <span class="task-difficulty" :data-difficulty="getDifficulty(data.difficulty)">{{ data.difficulty }}</span>
            </span>

            <p class="task-card__excerpt">{{ trimDescription(data.summary) }}</p>
        </span>

        <span v-if="data.stacks" class="task-card__bottom">
            <span class="task-card__tags">
                <span v-for="stack in data.stacks" class="task-card__tag">#{{ stack.name }}</span>
            </span>
        </span>
    </span>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const taskMainImage = computed(() => {
    return config.public.baseUrl + '/uploads/' + props.data.image
}) 

function getDifficulty(difficulty: string) {
    const difficultyEnum: Record<string, number> = {
        'Junior': 1,
        'Middle': 2,
        'Senior': 3
    }

    return difficultyEnum[difficulty]
}

function trimDescription(summary: string) {
    if (summary.length <= 150) {
        return summary
    } else {
        return summary.slice(0, 150) + '...'
    }
}

</script>