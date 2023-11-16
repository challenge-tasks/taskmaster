<template>
    <section class="section">
        <div class="mx-auto tm-container">
            
            <div class="mb-4 sm:mb-8 gap-5 flex flex-wrap items-center justify-between">

                <div class="flex flex-col">
                    <h2 class="section__title">Все задания</h2>
                </div>

                <div class="ml-auto sm:ml-0 flex items-center gap-3">
                    
                    <UPopover :open="isFilterPopperVisible" :popper="{ placement: 'bottom-end' }">
                    
                        <UButton @click="toggleFilterPopper" color="white" label="Фильтр" class="rounded-md" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        
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
                    
                    <UPopover :open="isSortPopperVisible" :popper="{ placement: 'bottom-end' }">
                    
                        <UButton @click="toggleSortPopper" color="white" label="Сортировка" class="rounded-md" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        
                        <template v-slot:panel>
                            <div class="py-2 px-3">
                                <div class="space-y-2" v-for="sort in sortOptions" :key="sort.groupName">
                                    <span v-if="sort.groupName" class="font-bold text-sm">{{ sort.groupName }}</span>
                                    <URadio v-for="option of sort.options" :key="option.value" v-model="sortCheckedValues" v-bind="option">
                                        <template v-slot:label>
                                            <span class="font-normal">{{ option.label }}</span>
                                        </template>
                                    </URadio>
                                </div>
                            </div>
                        </template>
                    
                    </UPopover>

                </div>

            </div>

            <div class="tasks">
                <NuxtLink :to="'/task/' + task.slug" v-for="task in tasks.list" class="tasks__item">
                    <TaskCard :data="task" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { TaskType } from 'types'
import { sortOptions } from '@/config/sortOptions'
import { filterOptions } from '@/config/filterOptions'

const { $api } = useNuxtApp()

useHead({
    title: 'Все задания'
})

let tasks = reactive({ list: [] as Array<TaskType> })

const response = await $api.tasks.getTasks()

if (response.data.value && response.status.value === 'success') {
    tasks.list = response.data.value.data
}

const filterCheckedValue = ref([])
const sortCheckedValues = ref('all')
const isSortPopperVisible = ref(false)
const isFilterPopperVisible = ref(false)

function toggleSortPopper() {
    isSortPopperVisible.value = !isSortPopperVisible.value
    isFilterPopperVisible.value = false
}

function toggleFilterPopper() {
    isSortPopperVisible.value = false
    isFilterPopperVisible.value = !isFilterPopperVisible.value
}

watch(() => sortCheckedValues.value, async (newVal) => {
    const options = {
        query: {
            sort: newVal
        }
    }

    const res = await $api.tasks.getTasks({}, options)

    if (res.data.value && res.status.value === 'success') {
        tasks.list = res.data.value.data
    }

})

watch(() => filterCheckedValue.value, async (newVal) => {
    const options = {
        query: {
            difficulty: newVal.join(',')
        }
    }

    const res = await $api.tasks.getTasks({}, options)

    if (res.data.value && res.status.value === 'success') {
        tasks.list = res.data.value.data
    }

})
</script>