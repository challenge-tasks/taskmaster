<template>
    <LazyUModal v-model="isModalVisible">

        <div class="flex gap-5 flex-col p-4">

            <div class="gap-2 flex items-center justify-between">
                <span class="font-medium text-lg text-slate-800">Отзыв о вашем решении</span>
                <UButton variant="ghost" @click="isModalVisible = false" icon="i-ion-close-outline" />
            </div>
            
            <div class="mb-3 flex gap-2 justify-around items-center">
                <div v-for="rating in ratings" :key="rating.value" :class="markRating(rating.value)" class="rating flex gap-1 flex-col items-center">
                    <div class="rating__img">
                        <img :src="images[rating.value]" alt="">
                    </div>
                    <span class="font-medium">{{ rating.value }}</span>
                </div>
            </div>

            <div v-if="taskReview.comment">
                <span class="block font-medium text-md text-slate-700">Есть некоторые замечания:</span>
                <ClientOnly>
                    <div class="text-slate-600" v-html="taskReview.comment"></div>
                </ClientOnly>
            </div>

            <div v-else class="mt-2 mb-4">
                <span class="block text-md text-center text-slate-400">К решению нет никаких замечаний...</span>
            </div>
            
        </div>
        
    </LazyUModal>
</template>

<script setup lang="ts">
import { filename } from 'pathe/utils'

interface PropsInterface {
    modelValue: boolean
    taskReview: { comment: string, rating: number }
}

const glob = import.meta.glob('@/assets/images/*.webp', { eager: true })
const images = Object.fromEntries(Object.entries(glob).map(([key, value]) => [filename(key), value.default]))

const ratings = ref([
    { value: 0 },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 }
])

const props = defineProps<PropsInterface>()
const emit = defineEmits<{ (e: 'update:modelValue', id: boolean): void }>()

const isModalVisible = computed({
    get() {
        return props.modelValue
    },

    set(newVal) {
        return emit('update:modelValue', newVal)
    }
})

function markRating(rating: number) {
    if (props.taskReview.rating === rating) {
        return 'grayscale-0'
    }

    return 'grayscale text-slate-400'
}

</script>