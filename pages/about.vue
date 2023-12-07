<template>
    <section class="section" style="margin-top: 0;">
        <div class="py-10">
            <div class="mx-auto tm-container">
                <div class="gap-y-5 sm:gap-0 flex flex-col-reverse md:flex-row items-center justify-around">
                    <div class="md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                        <h2 class="mb-3 font-medium text-xl sm:text-2xl lg:text-3xl">В чем заключается <span
                                class="text-royalBlue-500">идея</span>
                            проекта?</h2>
                        <p class="md:text-base lg:text-lg text-slate-600">
                            Проект нацелен на развитите навыков начинающих разработчиков, но мы не планируем ограничиваться
                            только
                            начинающими. Мы из своего опыта знаем, что найти идею для Pet-проекта самому
                            разработчику очень трудно, вокруг столько интересных проектов, что разработчики не могут
                            остановить
                            свой
                            выбор на одном из них, наиболее популярная причина это уровень программиста, то что может
                            выполнить
                            Middle не может выполнить Junior, также и с Middle разработчиком в сравнении с Senior. Исходя из
                            всего
                            этого было принято решение заняться этим проектом.
                        </p>
                    </div>

                    <div class="max-w-xs md:max-w-sm">
                        <img src="~/assets/images/puzzle-dynamic-premium.webp" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="bg-slate-50 py-10">
            <div class="mx-auto tm-container">
                <div class="gap-y-5 sm:gap-0 flex flex-col md:flex-row items-center justify-around">
                    <div class="max-w-xs md:max-w-sm">
                        <img src="~/assets/images/lab-dynamic-premium.webp" alt="">
                    </div>

                    <div class="md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                        <h2 class="mb-3 font-medium text-xl sm:text-2xl lg:text-3xl">Как все тут <span
                                class="text-royalBlue-500">работает?</span></h2>
                        <p class="md:text-base lg:text-lg text-slate-600">
                            У пользователя в нашей платформе есть возможность работать с задачей организованно. Пользователь
                            берет задачу на выполнение, после чего задача попадает к нему в кабинет со статусом
                            <span class="font-medium">«надо сделать»</span> по мере выполнения задачи пользователь сам
                            должен
                            будет менять статус задачи по очереди на следующие (выполняется, на проверке), есть еще 4-ый
                            статус,
                            это статус <span class="font-medium">«готово»</span>. У пользователя не получится
                            самопроизвольно
                            поставить такой статус, потому
                            что этот статус вы получаете после того, как администраторы проверят ваше задание и сочтут его
                            приемлемым для завершения.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section" style="margin-top: 0;">
        <div class="py-10">
            <div class="mx-auto tm-container">
                <div class="gap-y-5 sm:gap-0 flex flex-col-reverse md:flex-row items-center justify-around">
                    <div class="md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                        <h2 class="mb-3 font-medium text-xl sm:text-2xl lg:text-3xl">Что <span
                                class="text-indigo-600">планируем</span> в будущем?</h2>
                        <p class="tmd:text-base lg:text-lg text-slate-600">
                            В данный момент мы работаем над рейтинговой системой. Это означает что все пользователи которые
                            практикуются на заданиях в нашей платформе смогут соревноваться между собой. Первая тройка в
                            таблице рейтинга получат призы от администрации данного ресурса.
                        </p>
                    </div>

                    <div class="max-w-xs md:max-w-sm">
                        <img src="~/assets/images/gift-dynamic-premium.webp" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

useHead({
    title: 'О проекте'
})

</script>