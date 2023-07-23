<template>
    <span class="task-card">
        <span class="task-card__img">
            <img :src="data.image" :alt="data.description">
        </span>

        <span class="task-card__middle">

            <div class="mb-2 flex items-center justify-between gap-5">
                <h4 class="task-card__title">{{ data.name }}</h4>
                <span class="task-card__difficulty" :data-difficulty="getDifficulty(data.difficulty)">{{ data.difficulty
                }}</span>
            </div>

            <p class="task-card__excerpt">{{ trimDescription(data.description) }}</p>
        </span>

        <span v-if="data.stacks" class="task-card__bottom">
            <span class="task-card__tags">
                <span v-for="stack in data.stacks" class="task-card__tag">#{{ stack }}</span>
            </span>
        </span>
    </span>
</template>

<script setup lang="ts">

defineProps({
    data: {
        type: Object,
        required: true
    }
})

function getDifficulty(difficulty: string) {
    const difficultyEnum: Record<string, number> = {
        'Junior': 1,
        'Middle': 2,
        'Senior': 3
    }

    return difficultyEnum[difficulty]
}

function trimDescription(description: string) {
    if (description.length <= 150) {
        return description
    } else {
        return description.slice(0, 150) + '...'
    }
}
</script>