<template>
    <VueFinalModal v-model="isSignInModalVisible" overlayTransition="vfm-fade" contentTransition="vfm-fade" :lockScroll="true" class="modal" content-class="modal-content">
        <div class="mb-5 modal-content__header">
            <h2 class="mb-2 font-medium text-center text-xl text-black">Вход в аккаунт</h2>
            <p class="max-w-lg text-center mx-auto text-slate-500">Войдите в свой аккаунт для того чтобы получить больше возможностей!</p>
        </div>

        <div class="mb-6 max-w-sm mx-auto modal-content__body">
            <div class="mb-4 form-field">
                <label>
                    <span class="form-label">E-mail</span>
                    <input type="email" v-model="form.email" autocomplete="one-time-code" placeholder="Введите E-mail"
                        class="form-input form-input--email">
                </label>
            </div>
           
            <div class="mb-2 form-field">
                <label>
                    <span class="form-label">Пароль</span>
                    <input type="password" v-model="form.password" autocomplete="one-time-code" placeholder="Введите пароль"
                        class="form-input form-input--password">
                </label>
            </div>

            <div class="mb-4 flex justify-between">
                <NuxtLink to="/" class="text-blue-700 text-sm">Забыли пароль?</NuxtLink>
            </div>

            <Button 
                @click="authUser" 
                label="Войти"
                class="py-3 w-full btn btn--primary"
                :icon="{ 
                    class: 'btn__icon--right',
                    name: 'solar:login-2-outline' 
                }"
            />
        </div>

        <div class="flex justify-center">
            <span class="mr-1 text-sm text-slate-500">Все ещё нет аккаунта?</span>
            <button @click="authStore.toggleSignUpModal" class="text-blue-700 text-sm">Зарегистрироваться</button>
        </div>
    </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const form = reactive({
    email: '',
    password: ''
})

const authStore = useAuthentication()
const { isSignInModalVisible } = storeToRefs(authStore)

async function authUser() {}

</script>