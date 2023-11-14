<template>
    <section class="section">
        <div class="mx-auto tm-container">
            <div class="mb-4 sm:mb-8 gap-5 flex flex-wrap items-center justify-between">

                <div class="flex flex-col">
                    <h2 class="section__title">Все задания</h2>
                </div>

                <div class="ml-auto sm:ml-0 flex items-center gap-5">
                    <Dropdown :icon="{ name: 'octicon:sort-desc-24' }" label="Фильтровать по">
                        <template v-slot:options>
                            <div v-for="group in sortingOptions" class="dropdown__group">
                                <span class="dropdown__options-group">{{ group.groupName }}</span>
                                <Checkbox v-for="option in group.options" v-model="sortingCheckedValues" :customValue="option.value" :label="option.label" />
                            </div>
                        </template>
                    </Dropdown>

                    <Dropdown :icon="{ name: 'octicon:filter-24' }" label="Сортировать по">
                        <template v-slot:options>
                            <div v-for="group in filteringOptions" class="dropdown__group">
                                <span class="dropdown__options-group">{{ group.groupName }}</span>
                                <Radio v-for="option in group.options" v-model="filterCheckedValue" :customValue="option.value" :label="option.label" />
                            </div>
                        </template>
                    </Dropdown>
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

const filterCheckedValue = ref('all')
const sortingCheckedValues = ref(["1"])
const sortingOptions = reactive(sortOptions)
const filteringOptions = reactive(filterOptions)

watch(() => sortingCheckedValues.value, async (newVal) => {
    const options = {
        query: {
            filter: {
                difficulty: newVal
            }
        }
    }

    await $api.tasks.getTasks(options)
})
</script>