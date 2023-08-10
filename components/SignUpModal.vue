<template>
    <VueFinalModal v-model="isSignUpModalVisible" overlayTransition="vfm-fade" contentTransition="vfm-fade" @closed="eraseFilledData(form)" :lockScroll="true" class="modal" content-class="modal-content">
        <Form>
            <div class="mb-5 modal-content__header">
                <h2 class="mb-2 font-medium text-center text-xl text-black">Регистрация аккаунта</h2>
                <p class="max-w-lg text-center mx-auto text-slate-500">Зарегистрируйтесь для того чтобы получить больше возможностей!</p>
            </div>

            <div class="mb-6 max-w-sm mx-auto modal-content__body">
                
                <div class="mb-3">
                    <span class="form-label">E-mail</span>
                    <Field type="email" v-model="form.email" :rules="rules.email" name="email" placeholder="Введите электронную почту" class="form-input form-input--email" />
                    <ErrorMessage name="email" />
                </div>

                <div class="mb-3">
                    <span class="form-label">Пароль</span>
                    <Field type="password" v-model="form.password" name="password" placeholder="Введите пароль" class="form-input form-input--password" />
                    <ErrorMessage name="password" />
                </div>

                <div class="mb-5">
                    <span class="form-label">Повторите пароль</span>
                    <Field type="password" v-model="form.confirmPassword" name="confirm-password" placeholder="Введите пароль" class="form-input form-input--password" />
                    <ErrorMessage name="confirm-password" />
                </div>

                <Button @click="authUser" label="Зарегистрироваться" class="py-3 w-full btn btn--primary" :icon="{ class: 'btn__icon--right', name: 'octicon:person-add-24' }" />
            </div>

            <div class="flex justify-center">
                <span class="mr-1 text-sm text-slate-500">Уже есть аккаунт?</span>
                <button @click="authModals.toggleSignInModal" class="text-blue-700 text-sm">Войти</button>
            </div>
        </Form>
    </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const form = reactive({
    email: '',
    password: '',
    confirmPassword: ''
})

const rules = validationRules

const authModals = useAuthModals()
const { isSignUpModalVisible } = storeToRefs(authModals)

async function authUser() { }

</script>