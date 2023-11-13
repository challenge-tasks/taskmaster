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
                        <input type="text" v-model="user.data.username"  placeholder="Введите электронную почту" class="form-input form-input--username" />
                    </div>

                    <div class="mb-4 form-field">
                        <span class="form-label">E-mail</span>
                        <input type="email" v-model="user.data.email"  placeholder="Введите электронную почту" class="form-input form-input--email" />
                    </div>

                    <Button @click="updateProfile(userData)" :loading="isFetching" label="Сохранить" class="mb-2 py-3 w-full btn btn--primary" />
                    <Button @click="logOut" label="Выйти из аккаунта" class="py-3 w-full btn btn--ghost" />
                </div>


                <div class="div">
                    <h2 class="mb-4 font-medium text-2xl text-slate-600">Задачи пользователя</h2>

                    <div class="user-tasks relative">
                       
                        <ClientOnly>

                            <div v-show="isTasksFetching" class="py-7 flex flex-col items-center justify-center" :class="{ 'absolute h-full w-full bg-white': hasUserActiveTasks }">
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
                                <UserTask :task="task" v-for="task in userTasks.data" :key="task.id" @solution-upload="onSolutionUpload" />
                            </div>

                        </ClientOnly>

                    </div>

                </div>
                
            </div>

        </div>
    </section>

    <UploadSolutionModal v-model="isSolutionUploadModalVisible" :task-slug="uploadingTaskSlug" @closed="onSolutionUploadModalClose" />
</template>

<script setup lang="ts">
import UserTask from '@/components/tasks/UserTask.vue'
import UploadSolutionModal from '@/components/modals/UploadSolutionModal.vue'

useHead({ title: 'Профиль' })

interface UserDataInterface { 
    email: string 
    username: string 
}

const { logOut } = useUserAuth()
const { getUserTasks } = useTasks()
const { user, updateUser } = useUser()
const { userTasks } = storeToRefs(useTasks())
const { isFetching } = storeToRefs(useUser())
const { isTasksFetching } = storeToRefs(useTasks())

const uploadingTaskSlug = ref<string>('')
const isSolutionUploadModalVisible = ref<boolean>(false)

const userData = computed<UserDataInterface>(() => {
    return {
        email: user.data.email,
        username: user.data.username
    }
})

const hasUserActiveTasks = computed<boolean>(() => userTasks.value.data?.length > 0)

function updateProfile(data: UserDataInterface) {
    return updateUser(data)
}

function onSolutionUpload(taskSlug: string) {
    uploadingTaskSlug.value = taskSlug
    isSolutionUploadModalVisible.value = true
}

function onSolutionUploadModalClose() {
    uploadingTaskSlug.value = ''
}

onMounted(() => {
    getUserTasks(user.data.username)
})

</script>