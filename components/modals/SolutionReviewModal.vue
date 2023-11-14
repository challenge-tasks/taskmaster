<template>
    <VueFinalModal v-model="isModalVisible" v-bind="modalConfig">

        <div class="flex flex-col">
            <Rating />
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