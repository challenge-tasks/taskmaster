<template>

    <Head>
        <Title>Профиль</Title>
    </Head>

    <section class="section">
        <div class="mx-auto tm-container">

            <div class="grid lg:grid-cols-[300px_1fr] gap-5">

                <div class="w-full sm:w-80 lg:w-auto">
                    <div class="profile-img mx-auto sm:mx-0 mb-4">
                        <img :src="user.avatar">
                    </div>

                    <div class="mb-4 form-field">
                        <span class="form-label">Имя пользователя</span>
                        <UInput size="lg" type="text" color="white" icon="i-octicon-link-24" placeholder="Введите имя пользователя" v-model:model-value="user.username" />
                    </div>

                    <div class="mb-4 form-field">
                        <span class="form-label inline-flex items-center">E-mail</span>
                        <UInput size="lg" type="email" color="white" icon="i-octicon-mail-24" placeholder="Введите электронную почту" v-model:model-value="user.email" />
                    </div>

                    <ClientOnly>
                        <div class="flex flex-col gap-2">
                            <UButton trailing block @click="updateProfile(userData)" :loading="isUserUpdating" size="lg" class="btn rounded-lg">
                                Сохранить
                            </UButton>

                            <UButton block @click="logOut" :disabled="isLoggingOut" variant="soft" size="lg" class="btn rounded-lg">
                                Выйти из аккаунта
                            </UButton>
                        </div>
                    </ClientOnly>

                    <div v-if="!user.is_email_verified" class="mt-5 bg-slate-50 rounded-md p-3">
                        <span class="mb-2 block font-medium text-slate-700 text-sm">Ваш Email не подтвержден</span>
                        <span class="text-slate-500 text-xs">
                            <span>Чтобы завершить регистрацию потдвердите свой Email. Чтобы запросить письмо еще раз нажмите эту </span>
                            <UButton @click="emailVerifyRequest" variant="link" size="xs" class="px-0">ссылку</UButton>
                        </span>
                    </div>

                </div>


                <div class="div">
                    <h2 class="mb-4 font-medium text-2xl text-slate-600">Задачи пользователя</h2>

                    <div class="user-tasks relative" :style="tasksContainerStyle">

                        <ClientOnly>

                            <div v-show="isUserTasksFetching" class="py-7 flex flex-col items-center justify-center" :class="{ 'absolute z-50 h-full w-full bg-white': hasUserActiveTasks }">
                                <div class="w-20 h-20">
                                    <img src="../../assets/images/search.gif" alt="">
                                </div>
                                <h4 class="mb-2 text-xl text-slate-600">Достаем ваши задачи...</h4>
                                <p class="max-w-md text-center text-slate-400">Загружаем ваши задачи, пожалуйста подождите</p>
                            </div>

                            <div v-if="!isUserTasksFetching && !hasUserActiveTasks" class="py-7 px-3 sm:px-0 flex flex-col items-center justify-center">
                                <div class="w-20 h-20">
                                    <img src="../../assets/images/no-data.gif" alt="">
                                </div>
                                <h4 class="mb-2 text-xl text-slate-600">У вас еще нет задач :(</h4>
                                <p class="max-w-md text-center text-slate-400">У вас еще нет ни одной задачи на выполнении, перейдите на страницу всех задач и возьмите на выполнение задачу...</p>
                            </div>

                            <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3 p-3">
                                <UserTask 
                                    :task="task" 
                                    :key="task.id" 
                                    v-for="task in userTasks" 
                                    @review-request="onReviewRequest" 
                                    @solution-upload="onSolutionUpload(task.slug)" 
                                />
                            </div>

                        </ClientOnly>

                    </div>

                </div>

            </div>

        </div>
    </section>

    <SolutionReviewModal v-model="isSolutionReviewModalVisible" :task-review="taskReviewData" />
    <UploadSolutionModal v-model="isSolutionUploadModalVisible" :task-slug="uploadingTaskSlug" @closed="onSolutionUploadModalClose" />
</template>

<script setup lang="ts">
import { ITaskReview } from '@/types'

interface IUserData {
    email: string
    username: string
}

const toast = useToast()
const { updateUser } = useUser()
const { getUserTasks } = useTasks()
const { user } = storeToRefs(useUserStore())
const { logOut, requestEmailVerify } = useAuth()
const { isLoggingOut } = storeToRefs(useAuthStore())

const { isUserUpdating } = storeToRefs(useUserStore())
const { isUserTasksFetching, userTasks } = storeToRefs(useTaskStore())

const uploadingTaskSlug = ref<string>('')
const taskReviewData = ref({} as ITaskReview)
const isSolutionReviewModalVisible = ref<boolean>(false)
const isSolutionUploadModalVisible = ref<boolean>(false)

const userData = computed<IUserData>(() => {
    return {
        email: user.value.email,
        username: user.value.username
    }
})

const tasksContainerStyle = computed(() => {
    return isUserTasksFetching.value ? { minHeight: '200px' } : ''
})

const hasUserActiveTasks = computed<boolean>(() => userTasks.value.length > 0)

async function updateProfile(data: IUserData): Promise<void> {

    const response = await updateUser({ body: { ...data } })

    if (response.status.value === 'success') {
        toast.add({ 
            title: 'Пользовательские данные успешно обновлены',
            closeButton: { variant: 'ghost' }, 
        })
    }

}

async function emailVerifyRequest() {
    const { status, error } = await requestEmailVerify()

    if (status.value === 'success') {
        toast.add({
            title: 'Письмо успешно отправлено',
            closeButton: { variant: 'ghost' },
            description: 'Письмо с ссылкой для подтверждения Email успешно отправлено на вашу электронную почту'
        })
    }

    if (error.value) {
        toast.add({
            title: 'Не удалось отправить письмо',
            closeButton: { variant: 'ghost' },
            description: 'Что-то пошло не так при отправке письма для подтверждения вашего аккаунта, обратитесь в поддержку'
        })
    }

}

function onSolutionUpload(taskSlug: string) {
    uploadingTaskSlug.value = taskSlug
    isSolutionUploadModalVisible.value = true
}

function onSolutionUploadModalClose() {
    uploadingTaskSlug.value = ''
}

function onReviewRequest(payload: ITaskReview) {
    taskReviewData.value = payload
    isSolutionReviewModalVisible.value = true
}

getUserTasks({ customParams: { username: user.value.username } })

</script>