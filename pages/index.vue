<template>
    <section class="my-10">
        <div class="mx-auto tm-container">
            <div class="intro">
                <div class="intro__info">
                    <h1 class="mb-3 intro__title">На пути к <span class="text-royalBlue-500">совершенствованию</span>
                        навыков</h1>

                    <p :class="{ 'mb-4': !isAuthenticated }" class="intro__text text-slate-500">
                        Платформа, где ваши навыки обретают новое измерение. Независимо от
                        вашего уровня опыта, здесь вы найдете задачи на меру вашим амбициям.
                        <br />
                        Прокачайте свои скиллы, решая задачи разной сложности, и идите к своим целям!
                    </p>

                    <UButton v-if="!isAuthenticated" @click="showSignupModal" size="lg" icon="i-octicon-person-add-24"
                        trailing class="py-3 px-5 btn">
                        Зарегистрироваться
                    </UButton>
                </div>
                <div class="intro__img">
                    <img src="~/assets/images/trophy-dynamic-premium.png" />
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="mx-auto tm-container">
            <div class="tasks relative">
                <NuxtLink :to="'/task/' + task.slug" v-for="task in limitedTasks" class="tasks__item">
                    <TaskCard :data="task" />
                </NuxtLink>
                <div class="spoiler-block"></div>
            </div>

            <div class="mt-5 flex justify-center">
                <NuxtLink to="/tasks" class="w-full sm:w-auto flex bg-green-300 gap-2 py-3 btn btn--primary btn--rounded">
                    <span class="btn__label">Посмотреть все задания</span>
                    <UIcon name="i-octicon-tasklist-24" class="btn__icon" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

const { getTasks } = useTasks()
const { limitedTasks } = storeToRefs(useTaskStore())

const { showSignupModal } = useModals()
const { isAuthenticated } = storeToRefs(useAuthStore())

await getTasks()

</script>