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
                    <input 
                        type="email" 
                        v-model="form.email" 
                        @change="$v.email.$touch"
                        autocomplete="one-time-code" 
                        placeholder="Введите E-mail"
                        class="form-input form-input--email"
                    />
                    <transition-fade easing="linear">
                        <span  v-if="$v.email.$error" class="inline-block text-xs text-red-600">{{ $v.email.$errors[0].$message }}</span>
                    </transition-fade>
                </label>
            </div>
           
            <div class="mb-2 form-field">
                <label>
                    <span class="form-label">Пароль</span>
                    <input 
                        type="password" 
                        v-model="form.password"
                        @change="$v.password.$touch"
                        autocomplete="one-time-code" 
                        placeholder="Введите пароль"
                        class="form-input form-input--password"
                    />
                    <transition-fade easing="linear">
                        <span v-if="$v.password.$error" class="inline-block text-xs text-red-600">{{ $v.password.$errors[0].$message }}</span>
                    </transition-fade>
                </label>
            </div>

            <div class="mb-4 flex justify-between">
                <NuxtLink to="/" class="text-blue-700 text-sm">Забыли пароль?</NuxtLink>
            </div>

            <Button  @click="authUser"  label="Войти" class="py-3 w-full btn btn--primary" :icon="{  class: 'btn__icon--right', name: 'solar:login-2-outline' }" />
        </div>

        <div class="flex justify-center">
            <span class="mr-1 text-sm text-slate-500">Все ещё нет аккаунта?</span>
            <button @click="authStore.toggleSignUpModal" class="text-blue-700 text-sm">Зарегистрироваться</button>
        </div>
    </VueFinalModal>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { VueFinalModal } from 'vue-final-modal'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'

const form = reactive({
    email: '',
    password: ''
})

const rules = computed(() => {
    return {
        email: { 
            required: helpers.withMessage('Поле Email обязательна к заполнению', required), 
            email: helpers.withMessage('Неправильный формат Email', email)
        },
        password: { 
            required: helpers.withMessage('Поле пароля обязательна к заполнению', required), 
            minLength: helpers.withMessage('Длина пароля должна быть больше 6 символов', minLength(6))
        }
    }
})

const $v = useVuelidate(rules, form)

const authStore = useAuthModals()
const { isSignInModalVisible } = storeToRefs(authStore)

async function authUser() {}

</script>