<template>
    <section class="section">
        <div class="mx-auto tm-container">

            <div class="grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-5">

                <div class="div">
                    <div class="profile-img mx-auto sm:mx-0 mb-4">
                        <img :src="user.data.avatar">
                    </div>
                    
                    <div class="mb-4 form-field">
                        <span class="form-label">Имя пользователя</span>
                        <UInput
                            size="lg"
                            type="text"
                            color="white"
                            icon="i-octicon-link-24"
                            placeholder="Введите имя пользователя"
                            v-model:model-value="user.data.username"
                        />
                    </div>

                    <div class="mb-4 form-field">
                        <span class="form-label">E-mail</span>
                        <UInput
                            size="lg"
                            type="email"
                            color="white"
                            icon="i-octicon-mail-24"
                            placeholder="Введите электронную почту"
                            v-model:model-value="user.data.email"
                        />
                    </div>

                    <ClientOnly>
                        <div class="flex flex-col gap-2">
                            <UButton @click="updateProfile(userData)" trailing block :loading="isFetching" size="lg" class="btn rounded-lg">
                                Сохранить
                            </UButton>

                            <UButton @click="logOut" block variant="soft" size="lg" class="btn rounded-lg">
                                Выйти из аккаунта
                            </UButton>
                        </div>
                    </ClientOnly>

                </div>


                <div class="div">
                    <h2 class="mb-4 font-medium text-2xl text-slate-600">Задачи пользователя</h2>

                    <div class="user-tasks relative" :style="tasksContainerStyle">
                       
                        <ClientOnly>

                            <div v-show="isTasksFetching" class="py-7 flex flex-col items-center justify-center" :class="{ 'absolute z-50 h-full w-full bg-white': hasUserActiveTasks }">
                                <div class="w-20 h-20">
                                    <img src="../../assets/images/search.gif" alt="">
                                </div>
                                <h4 class="mb-2 text-xl text-slate-600">Достаем ваши задачи...</h4>
                                <p class="max-w-md text-center text-slate-400">Загружаем ваши задачи, пожалуйста подождите</p>
                            </div>

                            <div v-if="!isTasksFetching && !hasUserActiveTasks" class="py-7 px-3 sm:px-0 flex flex-col items-center justify-center">
                                <div class="w-20 h-20">
                                    <img src="../../assets/images/no-data.gif" alt="">
                                </div>
                                <h4 class="mb-2 text-xl text-slate-600">У вас еще нет задач :(</h4>
                                <p class="max-w-md text-center text-slate-400">У вас еще нет ни одной задачи на выполнении, перейдите на страницу всех задач и возьмите на выполнение задачу...</p>
                            </div>

                            <div v-else class="flex flex-col gap-3 p-3">
                                <UserTask 
                                    :task="task" 
                                    :key="task.id"
                                    v-for="task in userTasks.data" 
                                    @review-request="onReviewRequest"
                                    @solution-upload="onSolutionUpload" 
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

useHead({ title: 'Профиль' })

const toast = useToast()

interface UserDataInterface { 
    email: string 
    username: string 
}

interface TaskReviewInterface {
    comment: string
    rating: number
}

const { logOut } = useUserAuth()
const { getUserTasks } = useTasks()
const { user, updateUser } = useUser()
const { userTasks } = storeToRefs(useTasks())
const { isFetching } = storeToRefs(useUser())
const { isTasksFetching } = storeToRefs(useTasks())

const uploadingTaskSlug = ref<string>('')
const taskReviewData = ref({} as TaskReviewInterface)
const isSolutionReviewModalVisible = ref<boolean>(false)
const isSolutionUploadModalVisible = ref<boolean>(false)

const userData = computed<UserDataInterface>(() => {
    return {
        email: user.data.email,
        username: user.data.username
    }
})

const tasksContainerStyle = computed(() => {
    return isTasksFetching.value ? { minHeight: '200px' } : ''
})

const hasUserActiveTasks = computed<boolean>(() => userTasks.value.data?.length > 0)

async function updateProfile(data: UserDataInterface): Promise<void> {
    const status = await updateUser(data)

    if (status === 'success') {
        toast.add({ title: 'Пользовательские данные успешно обновлены' })
    }
    
}

function onSolutionUpload(taskSlug: string) {
    uploadingTaskSlug.value = taskSlug
    isSolutionUploadModalVisible.value = true
}

function onSolutionUploadModalClose() {
    uploadingTaskSlug.value = ''
}

function onReviewRequest(payload: TaskReviewInterface) {
    taskReviewData.value = payload
    isSolutionReviewModalVisible.value = true
}

onMounted(() => {
    getUserTasks(user.data.username)
})

</script>