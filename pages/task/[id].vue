<template>
    <Head>
        <Title>{{ task.data.name }}</Title>
    </Head>

    <section class="section">
        <div class="mx-auto px-3 container">
            <div class="task">

                <div class="flex justify-between items-center task__header">
                    <div class="mb-3 sm:mb-0 flex flex-col items-start">
                        <h2 class="mb-1 text-slate-700 text-2xl font-medium">{{ task.data.name }}</h2>
                        <span class="task-difficulty task-difficulty--big" :data-difficulty="getDifficultyLevel(task.data.difficulty)">{{ task.data.difficulty }}</span>
                    </div>
                    
                    <Button 
                        v-if="!isTaskDoing"
                        @click="handleTaskStart" 
                        class="sm:py-4 btn--primary" 
                        :loading="isFetching" 
                        :label="taskButtonLabel"
                        :icon="{ name: 'octicon:checklist-24' }" 
                    />

                    <div v-else class="flex gap-2">
                        <div class="flex items-center gap-2 bg-emerald-400 rounded-md px-3 py-3">
                            <span class="text-white">{{ taskButtonLabel }}</span>
                            <Icon name="octicon:zap-16" class="text-lg text-white" />
                        </div>

                    <div @click="handleTaskSolutionUpload" v-tooltip="'Загрузите свою работу для проверки'" class="flex items-center gap-2 px-4 py-3 bg-primary hover:opacity-75 active:hover:opacity-100 rounded-md cursor-pointer" title="Загрузить решение">
                            <Icon name="octicon:upload-16" class="text-xl text-white" />
                        </div>
                    </div>
                
                </div>

                <div class="task-image-gallery">
                    <Swiper v-bind="swiperConfig" class="task__images">
                        <SwiperSlide v-for="(image, key) in allImages" :key="key">
                            <div class="task-image">
                                <img :src="image" alt="">
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    <div class="swiper-navigation">
                        <button class="swiper-navigation__prev">
                            <Icon name="octicon:arrow-left-24" />
                        </button>
                        <button class="swiper-navigation__next">
                            <Icon name="octicon:arrow-right-24" />
                        </button>
                    </div>
                </div>

                <div class="task__content">

                    <div class="mb-4">
                        <span class="inline-block mb-2 font-medium text-slate-600">Стек технологий: </span>
                        <div class="task-tags">
                            <div v-for="stack in task.data.stacks" :key="stack.id" class="task-tags__item">
                                <span>{{ stack.name }}</span>
                            </div>
                        </div>
                    </div>

                    <client-only>
                        <p class="mb-4 text-slate-500" v-html="task.data.description"></p>
                    </client-only>
                </div>

            </div>
        </div>
    </section>

    <UploadSolutionModal v-model="isSolutionUploadModalVisible" :task-slug="task.data.slug" />
</template>

<script setup lang="ts">
import { TaskType } from '@/types'
import { getDifficultyLevel } from '@/utils'

let task = reactive({
    data: {} as TaskType
})

const { t } = useI18n()

const { params } = useRoute()
const appConfig = useRuntimeConfig()

const { getUserTasks } = useTasks()
const { toggleSignInModal } = useAuthModals()
const { fetchTaskDetails, startTask } = useTasks()

const { user } = useUser()
const { userTasks } = storeToRefs(useTasks())
const { isFetching } = storeToRefs(useTasks())
const { isAuthenticated } = storeToRefs(useUserAuth())

const isSolutionUploadModalVisible = ref<boolean>(false)

const taskDetailsResponse = await fetchTaskDetails(params.id)
if (taskDetailsResponse.data && taskDetailsResponse.status === 'success') {
    task.data = taskDetailsResponse.data.data
}

const isTaskDoing = computed(() => {
    return userTasks.value.data && userTasks.value.data.some((tsk: TaskType) => tsk.id === task.data.id)
})

const taskButtonLabel = computed(() => {
    console.log(task.data);
    
    const status = task.data.status
    return isTaskDoing.value ? t(`task.status.${status}`) : 'Выполнить задание'
})

const allImages = computed(() => {
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
    isSolutionUploadModalVisible.value = true
}

async function handleTaskStart() {
    if (isAuthenticated.value) {

        await startTask(user.data.username, task.data.id)
        await getUserTasks(user.data.username)

    } else {
        toggleSignInModal()
    }
}

</script>