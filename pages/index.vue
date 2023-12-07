<template>

    <Head>
        <Title>Главная</Title>
    </Head>

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
                    <UnLazyImage :placeholder-src="trophyPreloader" :src-set="trophy" width="360" height="360" />
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
                        <span class="block text-center text-slate-500 text-sm max-w-sm">Выберите задачу, добавьте ее в свой профиль и начните выполнять. Задача будет менять свой статус прямо как в Trello.</span>
                    </div>

                </div>

                <div class="mx-auto flex flex-col items-center tm-">
                    <div class="w-14 h-14 mb-3 flex items-center justify-center bg-royalBlue-100 rounded-full">
                        <UIcon name="i-ion-cloud-upload" class="text-royalBlue-500 w-10 h-10" />
                    </div>
                    <div class="flex flex-col">
                        <span class="mb-2 block text-center text-slate-700 font-medium">Загрузка вашего решения</span>
                        <span class="block text-center text-slate-500 text-sm max-w-sm">
                            Упакуйте ваше решение в .zip или .rar архив, загрузите свое решение, статус вашей задачи поменяется на 
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
                        <span class="block text-center text-slate-500 text-sm max-w-sm">Наши администраторы проверят ваше решение и поставят оценку, может быть даже отпишутся если будут замечания.</span>
                    </div>

                </div>

            </div>
        </div>
    </section>

    <section class="section">
        <div class="mx-auto tm-container">
            
            <div class="flex items-center justify-between">
                <h2 class="text-medium mb-0 text-2xl">Задания</h2>
                
                <div class="flex justify-center">
                    <UButton to="/tasks" variant="link">
                        <span class="font-medium">Все задания</span>
                    </UButton>
                </div>
            </div>

            <div v-if="isTasksFetching" class="tasks relative">
                <TaskCardSkeleton class="tasks__item" v-for="i in 8" />
            </div>

            <div v-else class="tasks relative">
                <NuxtLink :to="'/task/' + task.slug" v-for="task in limitedTasks" class="tasks__item">
                    <TaskCard :data="task" />
                </NuxtLink>
                <div v-if="limitedTasks.length > 4" class="spoiler-block"></div>
            </div>

        </div>
    </section>

    <ProviderAuthFailModal />
</template>

<script setup lang="ts">
import trophy from '~/assets/images/trophy-dynamic-premium.webp'
import trophyPreloader from '~/assets/images/trophy-preloader.webp'

const route = useRoute()
const toast = useToast()

const { getTasks } = useTasks()
const { limitedTasks, isTasksFetching } = storeToRefs(useTaskStore())

const { showSignupModal, showProviderAuthErrorModal } = useModals()
const { isAuthenticated } = storeToRefs(useAuthStore())

await getTasks() 

onMounted(() => {

    if (route.query.fail_reason === 'sign_in_with_provider_failed') {
        showProviderAuthErrorModal()
    }

    if (route.query.verify === 'success') {
    
        toast.add({ 
            title: 'Вы успешно подтвердили Email', 
            closeButton: { variant: 'ghost' },
            description: 'Теперь у вас есть возможность связать свой Github аккаунт на платформе' 
        })
    
    } else if (route.query.verify === 'fail') {
    
        toast.add({ 
            color: 'red',
            closeButton: { variant: 'ghost' },
            title: 'Что-то пошло не так при подтверждении',
            description: 'Произошла непредвиденная ошибка при подтверждении Email, пожалуйста сообщите разработчикам в группе <a href="https://t.me/+sNukVGsJnzFjYzcy" class="text-blue-500">Telegram</a>'
        })
    
    }
    
})

</script>