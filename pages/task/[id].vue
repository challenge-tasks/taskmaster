<template>
    <Head>
        <Title>{{ task.data.name }}</Title>
    </Head>

    <section class="section">
        <div class="mx-auto px-3 container">
            <div class="task">

                <div class="flex justify-between sm:items-center task__header">
                    <div class="mb-3 sm:mb-0 flex sm:flex-col items-center justify-between sm:items-start">
                        <h2 class="mb-1 text-slate-700 text-xl sm:text-2xl font-medium">{{ task.data.name }}</h2>
                        <span :class="badgeClassesBasedOnDifficultyLevel(task.data.difficulty)">{{ task.data.difficulty }}</span>
                    </div>

                    <UButton v-if="!isTaskDoing" @click="handleTaskStart" :loading="isFetching" trailing icon="i-octicon-checklist-24" class="justify-center sm:justify-items-start py-3 px-5 rounded-lg">
                        {{ taskButtonLabel }}
                    </UButton>

                    <div v-else class="flex flex-col sm:flex-row gap-2">
                        <UBadge color="gray" variant="solid" class="justify-center py-2 sm:py-3 order-1 sm:order-0">
                            <span class="text-sm font-medium px-2">{{ taskButtonLabel }}</span>
                            <UIcon name="i-octicon-zap-16" class="text-lg text-gray-700" />
                        </UBadge>

                        <UTooltip text="Загрузить свое решение" :popper="{ arrow: true, placement: 'auto' }" class="order-0 sm:order-1">
                            <UButton v-if="!isTaskDone" :disabled="isTaskInReview" @click="handleTaskSolutionUpload" icon="i-octicon-upload-16" class="p-2 sm:p-1.5 btn rounded-lg">
                                <span class="sm:hidden">Загрузить решение</span>
                            </UButton>
                        </UTooltip>
                    </div>

                </div>

                <div class="task-image-gallery">
                    <Swiper v-bind="swiperConfig" class="task__images">
                        <SwiperSlide v-for="(image, key) in allTaskImages" :key="key">
                            <div class="task-image">
                                <img :src="image" alt="">
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    <div class="swiper-navigation">
                        <button class="swiper-navigation__prev">
                            <UIcon name="i-octicon-arrow-left-24" class="text-white" />
                        </button>
                        <button class="swiper-navigation__next">
                            <UIcon name="i-octicon-arrow-right-24" class="text-white" />
                        </button>
                    </div>
                </div>

                <div class="task__content">

                    <div class="mb-4">
                        <span class="inline-block mb-2 font-medium text-slate-600">Стек технологий: </span>
                        <div class="flex flex-wrap gap-2">
                            <UBadge v-for="stack in task.data.stacks" :key="stack.id" class="rounded-full" color="sky" variant="subtle">
                                {{ stack.name }}
                            </UBadge>
                        </div>
                    </div>

                    <client-only>
                        <p class="mb-4 text-slate-500" v-html="task.data.description"></p>
                    </client-only>
                </div>

            </div>
        </div>
    </section>

    <UploadSolutionModal v-model="isSolutionUploadModalVisible" :task-slug="task.data.slug ?? ''" />
</template>

<script setup lang="ts">
import { ITaskType } from '@/types'
import { badgeClassesBasedOnDifficultyLevel } from '@/utils'

let task = reactive({
    data: {} as ITaskType
})


const { t } = useI18n()

const { $api } = useNuxtApp()

const { params } = useRoute()
const appConfig = useRuntimeConfig()

// const { startTask } = useTasks()
// const { getUserTasks } = useTasks()
// const { toggleSignInModal } = useAuthModals()

// const { user } = useUser()
// const { userTasks } = storeToRefs(useTasks())
// const { isFetching } = storeToRefs(useTasks())
// const { isAuthenticated } = storeToRefs(useUserAuth())

const isSolutionUploadModalVisible = ref<boolean>(false)

const res = await $api.tasks.getTaskDetail({}, { customParams: { slug: params.id } })

if (res.data.value && res.data.value.data && res.status.value === 'success') {
    task.data = res.data.value.data
}

const isTaskDoing = computed(() => {
    return userTasks.value.data && userTasks.value.data.some((tsk: ITaskType) => tsk.id === task.data.id)
})

const isTaskDone =  computed(() => {
    return task.data.status === 'done'
})

const isTaskInReview =  computed(() => {
    return task.data.status === 'reviewing'
})

const taskButtonLabel = computed(() => {
    const name = task.data.status
    return isTaskDoing.value ? t(`task.status.${name}`) : 'Выполнить задание'
})

const allTaskImages = computed(() => {
    const result = [task.data.image]


    if (task.data.images?.length) {
        for (let i = 0; i < task.data.images?.length; i++) {
            result.push(task.data.images[i])
        }
    }

    return result.map(img => appConfig.public.baseUrl + '/uploads/' + img)
})

const swiperConfig = {
    modules: [SwiperNavigation],
    grabCursor: true,
    navigation: {
        prevEl: '.swiper-navigation__prev',
        nextEl: '.swiper-navigation__next'
    }
}

function handleTaskSolutionUpload() {
    if (!isTaskInReview.value) {
        isSolutionUploadModalVisible.value = true
    }
}

async function handleTaskStart() {
    if (isAuthenticated.value) {

        const res = await startTask(user.data.username, task.data.id)

        if (res) {
            task.data.status = res.data.status
        }

        await getUserTasks(user.data.username)

    } else {
        toggleSignInModal()
    }
}

</script>