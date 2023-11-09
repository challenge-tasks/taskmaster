<template>
    <section class="section">
        <div class="mx-auto tm-container">

            <div class="grid grid-cols-[300px_1fr] gap-5">

                <div class="div">
                    <div class="profile-img mb-4">
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

                    <div class="user-tasks">
                        
                        <div v-show="!hasUserActiveTasks" class="flex flex-col items-center justify-center">
                            <div class="w-40 h-40">
                                <img src="../../assets/images/no-data.gif" alt="">
                            </div>
                            <h4 class="mb-2 text-xl text-slate-600">У вас еще нет задач :(</h4>
                            <p class="max-w-md text-center text-slate-400">У вас еще нет ни одной задачи на выполнении, перейдите на страницу всех задач и возьмите на выполнение задачу...</p>
                        </div>

                    </div>

                </div>
                
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">

useHead({
    title: 'Профиль'
})

const { logOut } = useUserAuth()
const { user, updateUser } = useUser()
const { userTasks } = storeToRefs(useUser())
const { isFetching } = storeToRefs(useUser())

const userData = computed(() => {
    return {
        email: user.data.email,
        username: user.data.username
    }
})

const hasUserActiveTasks = computed(() => userTasks.value.data?.length > 0)

watch(userTasks, (newVal) => {
    console.log(newVal)
})

function updateProfile(data: { username: string, email: string }) {
    return updateUser(data)
}


</script>