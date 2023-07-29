<template>
    <VueFinalModal v-model="modalState" class="modal" content-class="modal-content">
        <div class="mb-5 modal-content__header">
            <h2 class="mb-2 font-medium text-center text-xl text-black">Вход в аккаунт</h2>
            <p class="max-w-lg text-center mx-auto text-slate-500">Войдите в свой аккаунт для того чтобы получить больше возможностей!</p>
        </div>
        <div class="max-w-sm mx-auto modal-content__body">
            <div class="mb-4 form-field">
                <label>
                    <span class="form-label">E-mail</span>
                    <input type="email" autocomplete="one-time-code" placeholder="Введите E-mail" class="form-input form-input--email">
                </label>
            </div>
            <div class="mb-2 form-field">
                <label>
                    <span class="form-label">Пароль</span>
                    <input type="password" autocomplete="one-time-code" placeholder="Введите пароль" class="form-input form-input--password">
                </label>
            </div>
            <div class="mb-4 flex justify-end">
                <NuxtLink to="/" class="text-blue-700 text-sm">Забыли пароль?</NuxtLink>
            </div>
            <Button type="button" class="py-3 w-full btn btn--primary" :icon="{ name: 'solar:login-2-linear', class: 'btn__icon--right' }" label="Войти" />
        </div>
    </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
const modalState = ref(false)
</script>