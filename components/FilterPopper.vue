<template>
    <UPopover :open="isFilterPopperVisible" :popper="{ placement: 'bottom-end' }">
        <UButton @click="toggleFilterPopper" size="md" color="white" label="Фильтр" class="rounded-md" trailing-icon="i-heroicons-chevron-down-20-solid" />

        <template v-slot:panel>
            <div class="py-2 px-3">
                <div class="space-y-2" v-for="filter in filterOptions" :key="filter.groupName">
                    <span v-if="filter.groupName" class="font-bold text-sm">{{ filter.groupName }}</span>
                    <UCheckbox v-for="option of filter.options" :key="option.value" v-model="filterCheckedValue" v-bind="option">
                        <template v-slot:label>
                            <span class="font-normal">{{ option.label }}</span>
                        </template>
                    </UCheckbox>
                </div>
            </div>
        </template>

    </UPopover>
</template>

<script setup lang="ts">
import { filterOptions } from '@/config/filterOptions'

const emit = defineEmits<{
    (e: 'model-update', value: number[]): void
 }>()

const filterCheckedValue = ref([])
const isFilterPopperVisible = ref(false)

function toggleFilterPopper() {
    isFilterPopperVisible.value = !isFilterPopperVisible.value
}

watch(filterCheckedValue, (newVal) => {
    emit('model-update', newVal)
})

</script>
