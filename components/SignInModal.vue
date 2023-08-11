<template>
    <VueFinalModal v-model="isSignInModalVisible" overlayTransition="vfm-fade" contentTransition="vfm-fade" @closed="eraseFilledData(form)" :lockScroll="true" class="modal" content-class="modal-content">
        <div class="mb-5 modal-content__header">
            <h2 class="mb-2 font-medium text-center text-xl text-black">Вход в аккаунт</h2>
            <p class="max-w-lg text-center mx-auto text-slate-500">Войдите в свой аккаунт для того чтобы получить больше возможностей!</p>
        </div>

        <Form class="mb-6 max-w-sm mx-auto modal-content__body">
            <div class="mb-4 form-field">
                <span class="form-label">E-mail</span>

                <Field v-model="form.email" v-slot="{ field, meta }" :rules="rules.fields.email" name="email">
                    <input type="email" v-bind="field"  placeholder="Введите электронную почту" class="form-input form-input--email" :class="{ 'form-input--error': meta.touched && !meta.valid }">
                </Field>
                
                <transition-slide>
                    <ErrorMessage name="email" class="text-xs text-red-500" />
                </transition-slide>
            </div>
           
            <div class="mb-2 form-field">
                <span class="form-label">Пароль</span>
                    
                <Field v-model="form.password" v-slot="{ field, meta }" :rules="rules.fields.password" name="password">
                    <input type="password" v-bind="field" placeholder="Введите пароль" class="form-input form-input--password" :class="{ 'form-input--error': meta.touched && !meta.valid }" />
                </Field>
                
                <transition-slide>
                    <ErrorMessage name="password" class="text-xs text-red-500" />
                </transition-slide>
            </div>

            <div class="mb-4 flex justify-between">
                <NuxtLink to="/" class="text-blue-700 text-sm">Забыли пароль?</NuxtLink>
            </div>

            <Button type="submit"  label="Войти" class="py-3 w-full btn btn--primary" :icon="{ name: 'solar:login-2-outline' }" />
        </Form>

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

const rules = validationRules

const authStore = useAuthModals()
const { isSignInModalVisible } = storeToRefs(authStore)

async function handleSignInFormSubmit() {}

</script>