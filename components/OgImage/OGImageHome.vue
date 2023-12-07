<template>
    <div>
        <section class="my-10">
            <div class="mx-auto tm-container">
                <div class="intro">
                    <div class="intro__info">
                        <h1 class="mb-3 intro__title">На пути к <span class="text-royalBlue-500">совершенствованию</span>
                            навыков</h1>

                        <p class="intro__text text-slate-500">
                            Платформа, где ваши навыки обретают новое измерение. Независимо от
                            вашего уровня опыта, здесь вы найдете задачи на меру вашим амбициям.
                            <br />
                            Прокачайте свои скиллы, решая задачи разной сложности, и идите к своим целям!
                        </p>
                    </div>
                    <div class="intro__img">
                        <UnLazyImage :placeholder-src="trophyPreloader" :src-set="trophy" width="360" height="360"
                            alt="Gold trophy image" />
                    </div>
                </div>
            </div>
        </section>

        <section class="my-16 md:my-20">
            <div class="mx-auto tm-container">

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-4">

                    <div class="mx-auto flex flex-col items-center tm-">
                        <div class="w-14 h-14 mb-3 flex items-center justify-center bg-royalBlue-100 rounded-full">
                            <UIcon name="i-ant-design-code-sandbox-circle-filled" class="text-royalBlue-500 w-10 h-10" />
                        </div>
                        <div class="flex flex-col">
                            <span class="mb-2 block text-center text-slate-700 font-medium">Работа над задачей</span>
                            <span class="block text-center text-slate-500 text-sm max-w-sm">Выберите задачу, добавьте ее в
                                свой профиль и начните выполнять. Задача будет менять свой статус прямо как в Trello.</span>
                        </div>

                    </div>

                    <div class="mx-auto flex flex-col items-center tm-">
                        <div class="w-14 h-14 mb-3 flex items-center justify-center bg-royalBlue-100 rounded-full">
                            <UIcon name="i-ion-cloud-upload" class="text-royalBlue-500 w-10 h-10" />
                        </div>
                        <div class="flex flex-col">
                            <span class="mb-2 block text-center text-slate-700 font-medium">Загрузка вашего решения</span>
                            <span class="block text-center text-slate-500 text-sm max-w-sm">
                                Упакуйте ваше решение в .zip или .rar архив, загрузите свое решение, статус вашей задачи
                                поменяется на
                                <br>
                                <b class="text-royalBlue-500">На проверке.</b>
                            </span>
                        </div>

                    </div>

                    <div class="mx-auto flex flex-col items-center tm-">
                        <div class="w-14 h-14 mb-3 flex items-center justify-center bg-royalBlue-100 rounded-full">
                            <UIcon name="i-ion-checkmark-done-circle" class="text-royalBlue-500 w-10 h-10" />
                        </div>
                        <div class="flex flex-col">
                            <span class="mb-2 block text-center text-slate-700 font-medium">Проверка решения</span>
                            <span class="block text-center text-slate-500 text-sm max-w-sm">Наши администраторы проверят
                                ваше решение и поставят оценку, может быть даже отпишутся если будут замечания.</span>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import trophy from '@/assets/images/trophy-dynamic-premium.webp'
import trophyPreloader from '@/assets/images/trophy-preloader.webp'

defineOptions({
    inheritAttrs: false,
})

const props = defineProps({
    title: String,
})

</script>