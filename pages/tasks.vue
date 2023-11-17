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

            <div v-if="tasks.length" class="tasks">
                <NuxtLink :to="'/task/' + task.slug" v-for="task in tasks" class="tasks__item">
                    <TaskCard :data="task" />
                </NuxtLink>
            </div>

            <div v-else class="mt-40 grayscale flex flex-col justify-center items-center">
                <div class="w-20 h-20">
                    <img src="@/assets/images/moving-eye.gif" />
                </div>
                <span class="block mb-2 font-bold text-slate-600">По вашему запросу задачи не найдены...</span>
                <p class="max-w-md text-center text-slate-400">Не удалось найти задачи по вашему запросу, попробуйте изменить свой запрос и попробовать заново</p>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">

useHead({ title: 'Все задания' })

const { getTasks } = useTasks()
const { tasks } = storeToRefs(useTaskStore())

async function handleFilterModelUpdate(payload: number[]) {
    const options = {
        query: {
            difficulty: payload.join(',')
        }
    }

    await getTasks(options)
}

async function handleSortModelUpdate(payload: string) {

    const options = {
        query: {
            sort: payload
        }
    }

    await getTasks(options)
}

await getTasks()

</script>