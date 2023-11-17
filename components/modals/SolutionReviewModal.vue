<template>
    <VueFinalModal v-model="isModalVisible" v-bind="modalConfig">

        <div class="flex gap-5 flex-col">

            <div class="gap-2 flex items-center justify-between">
                <span class="font-medium text-lg text-slate-800">Отзыв о вашем решении</span>
                <UButton variant="ghost" icon="i-ion-close-outline" />
            </div>
            
            <Rating />

            <div class="px-2">
                <span class="mb-2 block font-medium text-md text-slate-700">Есть некоторые замечания...</span>

                <ClientOnly>
                    <div class="text-slate-600" v-html="taskReview.comment"></div>
                </ClientOnly>

            </div>
            
        </div>
        
    </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

interface PropsInterface {
    modelValue: boolean
    taskReview: { comment: string, rating: number }
}

const props = defineProps<PropsInterface>()
const emit = defineEmits<{ (e: 'update:modelValue', id: boolean): void }>()

const modalConfig = ref({
    class: "modal",
    lockScroll: true,
    overlayTransition: "vfm-fade",
    contentTransition: "vfm-fade",
    contentClass: "max-w-xl w-full bg-white rounded-md px-5 py-4"
})

const isModalVisible = computed({
    get() {
        return props.modelValue
    },

    set(newVal) {
        return emit('update:modelValue', newVal)
    }
})

</script>