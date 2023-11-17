<template>
    <Head>
        <Title>{{ task.name }}</Title>
    </Head>

    <section class="section">
        <div class="mx-auto px-3 container">
            <div class="task">

                <div class="flex justify-between sm:items-center task__header">
                    <div class="mb-3 sm:mb-0 flex sm:flex-col items-center justify-between sm:items-start">
                        <h2 class="mb-1 text-slate-700 text-xl sm:text-2xl font-medium">{{ task.name }}</h2>
                        <span :class="badgeClassesBasedOnDifficultyLevel(task.difficulty)">{{ task.difficulty }}</span>
                    </div>

                    <UButton v-if="!isTaskDoing" @click="handleTaskStart" :loading="isTaskStarting" trailing icon="i-octicon-checklist-24" class="justify-center sm:justify-items-start py-3 px-5 rounded-lg">
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
                            <UBadge v-for="stack in task.stacks" :key="stack.id" class="rounded-full" color="sky" variant="subtle">
                                {{ stack.name }}
                            </UBadge>
                        </div>
                    </div>

                    <client-only>
                        <p class="mb-4 text-slate-500" v-html="task.description"></p>
                    </client-only>
                </div>

            </div>
        </div>
    </section>

    <UploadSolutionModal v-model="isSolutionUploadModalVisible" :task-slug="task.slug ?? ''" />
</template>

<script setup lang="ts">
import { ITaskType } from '@/types'
import { badgeClassesBasedOnDifficultyLevel } from '@/utils'

let task = ref({} as ITaskType)

const { t } = useI18n()

const { params } = useRoute()
const appConfig = useRuntimeConfig()

const { showSigninModal } = useModals()
const { startTask, getTaskDetail } = useTasks()

const { user } = storeToRefs(useUserStore())
const { isTaskStarting } = storeToRefs(useTaskStore())
const { isAuthenticated } = storeToRefs(useAuthStore())

const isSolutionUploadModalVisible = ref<boolean>(false)

const isTaskDoing = computed(() => {
    return task.value.status === 'in_development'
})

const isTaskDone =  computed(() => {
    return task.value.status === 'done'
})

const isTaskInReview =  computed(() => {
    return task.value.status === 'reviewing'
})

const taskButtonLabel = computed(() => {
    const name = task.value.status
    return isTaskDoing.value ? t(`task.status.${name}`) : 'Выполнить задание'
})

const allTaskImages = computed(() => {
    const result = [task.value.image]


    if (task.value.images?.length) {
        for (let i = 0; i < task.value.images?.length; i++) {
            result.push(task.value.images[i])
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

async function fetchTaskDetail() {
    const res = await getTaskDetail({ customParams: { slug: params.id } })

    if (res.data.value && res.status.value === 'success') {
        task.value = res.data.value.data
    }
}

async function handleTaskStart() {
    if (isAuthenticated.value) {

        const username = user.value.username
        const res = await startTask({ customParams: { username }, fetcherOptions: { body: { task_id: task.value.id } } })
        
        if (res.data.value) {
            task.value.status = res.data.value.data.status
        }

    } else {
        showSigninModal()
    }
}

await fetchTaskDetail()

</script>