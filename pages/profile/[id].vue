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

                    <Button @click="updateProfile(user.data)" label="Сохранить" class="mb-2 py-3 w-full btn btn--primary" />
                    <Button @click="logOut" label="Выйти из аккаунта" class="py-3 w-full btn btn--ghost" />
                </div>


                <div class="div">
                    <h2 class="text-2xl text-slate-600">Задачи пользователя</h2>

                    

                </div>
                
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import type { User } from 'types';


const { user, updateUser } = useUser()
const { logOut } = useUserAuth()

useHead({
    title: 'Профиль'
})

async function updateProfile(data: User | { username: string, email: string }) {
    return await updateUser(data)
}

</script>