<template>
    <section class="section">
        <div class="mx-auto px-3 container">
            <div class="task">

                <div class="flex justify-between items-start task__header">
                    <div class="mb-3 sm:mb-0 flex flex-col items-start">
                        <h2 class="mb-1 text-slate-700 text-2xl font-medium">E-commerce website</h2>
                        <span class="task-difficulty task-difficulty--big" :data-difficulty="1">Junior</span>
                    </div>
                    <Button label="Выполнить задание" :icon="{ name: 'octicon:checklist-24' }" class="sm:py-4 py-3 btn--primary" />
                </div>

                <div class="task-image-gallery">
                    <Swiper v-bind="swiperConfig" class="task__images">
                        <SwiperSlide>
                            <div class="task-image">
                                <img src="https://t.ly/wJD9g" alt="">
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div class="task-image">
                                <img src="https://t.ly/H-Iob" alt="">
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div class="task-image">
                                <img src="https://t.ly/tNGmt" alt="">
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div class="task-image">
                                <img src="https://t.ly/l5SFz" alt="">
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
                            <div class="task-tags__item">
                                <span>HTML</span>
                            </div>
                            <div class="task-tags__item">
                                <span>Vue.js</span>
                            </div>
                            <div class="task-tags__item">
                                <span>CSS</span>
                            </div>
                            <div class="task-tags__item">
                                <span>Javascript</span>
                            </div>
                        </div>
                    </div>

                    <p class="mb-4 text-slate-500">
                        In this project, you'll build a fully-functional link-sharing app for developers! You'll practice
                        working with image uploads, repeater fields, drag-and-drop, and more! This challenge is designed to
                        sharpen your JavaScript and form validation skills. Working with dates in JavaScript can be tricky,
                        so this will be a nice test!
                    </p>

                </div>

            </div>

            <div class="task-requirements">

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

useHead({
    title: 'E-commerce website'
})

const swiperConfig = {
    modules: [SwiperNavigation],
    grabCursor: true,
    navigation: {
        prevEl: '.swiper-navigation__prev',
        nextEl: '.swiper-navigation__next'
    }
}

</script>