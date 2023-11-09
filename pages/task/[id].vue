<template>
    <Head>
        <Title>{{ task.name }}</Title>
    </Head>

    <section class="section">
        <div class="mx-auto px-3 container">
            <div class="task">

                <div class="flex justify-between items-start task__header">
                    <div class="mb-3 sm:mb-0 flex flex-col items-start">
                        <h2 class="mb-1 text-slate-700 text-2xl font-medium">{{ task.name }}</h2>
                        <span class="task-difficulty task-difficulty--big" :data-difficulty="getDifficultyLevel(task.difficulty)">{{ task.difficulty }}</span>
                    </div>
                    <Button @click="handleTaskStart(task.id)" :loading="isFetching" label="Выполнить задание" :icon="{ name: 'octicon:checklist-24' }" class="sm:py-4 btn--primary" />
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
                            <div v-for="stack in task.stacks" :key="stack.id" class="task-tags__item">
                                <span>{{ stack.name }}</span>
                            </div>
                        </div>
                    </div>

                    <client-only>
                        <p class="mb-4 text-slate-500" v-html="task.description"></p>
                    </client-only>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { TaskType } from '@/types'
import { getDifficultyLevel } from '@/utils'

let task: TaskType | undefined = reactive({
    id: 0,
    slug: '',
    name: '',
    image: '',
    summary: '',
    difficulty: '',
    stacks: [],
    tags: [],
    created_at: 0,
    updated_at: 0
})

const { params } = useRoute()
const config = useRuntimeConfig()

const { user } = useUser()
const { toggleSignInModal } = useAuthModals()
const { isFetching } = storeToRefs(useTasks())
const { fetchTaskDetails, startTask } = useTasks()
const { isAuthenticated } = storeToRefs(useUserAuth())

const response = await fetchTaskDetails(params.id)

if (response.status === 'success') {
    task = response.data?.data
}

const allImages = computed(() => {
    const result = [task?.image]


    if (task?.images?.length) {
        for (let i = 0; i < task?.images?.length; i++) {
            result.push(task?.images[i])
        }
    }

    return result.map(img => config.public.baseUrl + '/uploads/' + img)
})

const swiperConfig = {
    modules: [SwiperNavigation],
    grabCursor: true,
    navigation: {
        prevEl: '.swiper-navigation__prev',
        nextEl: '.swiper-navigation__next'
    }
}

function handleTaskStart(taskId: number) {
    if (isAuthenticated.value) {

        startTask(user.data.username, taskId)

    } else {
        toggleSignInModal()
    }
}

</script>