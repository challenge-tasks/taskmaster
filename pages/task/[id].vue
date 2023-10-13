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
                    <Button @click="handleTaskStart" label="Выполнить задание" :icon="{ name: 'octicon:checklist-24' }"
                        class="sm:py-4 py-3 btn--primary" />
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

                    <p class="mb-4 text-slate-500" v-html="task.description"></p>

                </div>

            </div>

            <div class="task-requirements">

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { TaskType } from '@/types'
import { getDifficultyLevel } from '@/utils'

let task: TaskType = reactive({})

const { params } = useRoute()
const config = useRuntimeConfig()
const { fetchTaskDetails } = useTasks()
const { toggleSignUpModal } = useAuthModals()
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

function handleTaskStart() {
    if (isAuthenticated.value) {

    } else {
        toggleSignUpModal()
    }
}

</script>