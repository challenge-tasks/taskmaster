<template>
    <UPopover :open="isSortPopperVisible" :popper="{ placement: 'bottom-end' }">
                    
        <UButton @click="toggleSortPopper" size="md" color="white" label="Сортировка" class="rounded-md" trailing-icon="i-heroicons-chevron-down-20-solid" />
        
        <template v-slot:panel>
            <div class="py-2 px-3">
                <div class="space-y-2" v-for="sort in sortOptions" :key="sort.groupName">
                    <span v-if="sort.groupName" class="font-bold text-sm">{{ sort.groupName }}</span>
                    <URadio v-for="option of sort.options" :key="option.value" v-model="sortCheckedValue" v-bind="option">
                        <template v-slot:label>
                            <span class="font-normal">{{ option.label }}</span>
                        </template>
                    </URadio>
                </div>
            </div>
        </template>
    
    </UPopover>
</template>

<script setup lang="ts">
import { sortOptions } from '@/config/sortOptions'


const emit = defineEmits<{
    (e: 'model-update', value: string): void
 }>()

const isSortPopperVisible = ref(false)
const sortCheckedValue = ref<string>('')

function toggleSortPopper() {
    isSortPopperVisible.value = !isSortPopperVisible.value
}

watch(sortCheckedValue, (newVal) => {
    emit('model-update', newVal)
})

</script>
