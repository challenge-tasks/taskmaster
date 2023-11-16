<template>
    <section class="section">
        <div class="mx-auto tm-container">
            
            <div class="mb-4 sm:mb-8 gap-3 md:gap-5 flex flex-wrap items-center justify-between">

                <div class="flex flex-col">
                    <h2 class="section__title">Все задания</h2>
                </div>

                <div class="ml-auto sm:ml-0 flex items-center gap-3">
                    <FilterPopper @model-update="handleFilterModelUpdate" />
                    <SortPopper @model-update="handleSortModelUpdate" />
                </div>

            </div>

            <div v-if="tasks.list.length" class="tasks">
                <NuxtLink :to="'/task/' + task.slug" v-for="task in tasks.list" class="tasks__item">
                    <TaskCard :data="task" />
                </NuxtLink>
            </div>

            <div v-else class="mt-40 grayscale flex flex-col justify-center items-center">
                <div class="w-20 h-20">
                    <img src="@/assets/images/moving-eye.gif" />
                </div>
                <span class="block mb-2 font-medium text-slate-600">По вашему запросу задачи не найдены...</span>
                <p class="max-w-md text-center text-slate-400">Не удалось найти задачи по вашему запросу, попробуйте изменить свой запрос и попробовать заново</p>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import type { TaskType } from 'types'

const { $api } = useNuxtApp()

useHead({ title: 'Все задания' })

let tasks = reactive({ list: [] as Array<TaskType> })

const response = await $api.tasks.getTasks()

if (response.data.value && response.status.value === 'success') {
    tasks.list = response.data.value.data
}

async function handleFilterModelUpdate(payload: number[]) {
    const options = {
        query: {
            difficulty: payload.join(',')
        }
    }

    const res = await $api.tasks.getTasks({}, options)

    if (res.data.value && res.status.value === 'success') {
        tasks.list = res.data.value.data
    }
}

async function handleSortModelUpdate(payload: string) {
    const options = {
        query: {
            sort: payload
        }
    }

    const res = await $api.tasks.getTasks({}, options)

    if (res.data.value && res.status.value === 'success') {
        tasks.list = res.data.value.data
    }
}
</script>