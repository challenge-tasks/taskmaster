<template>
    <VueFinalModal v-model="isSignUpModalVisible" overlayTransition="vfm-fade" contentTransition="vfm-fade" :lockScroll="true" class="modal" content-class="modal-content">
        <div class="mb-5 modal-content__header">
            <h2 class="mb-2 font-medium text-center text-xl text-black">Регистрация аккаунта</h2>
            <p class="max-w-lg text-center mx-auto text-slate-500">Зарегистрируйтесь для того чтобы получить больше возможностей!</p>
        </div>

        <div class="mb-6 max-w-sm mx-auto modal-content__body">
            <label class="mb-4 form-field">
                <span class="form-label">E-mail</span>
                    <input 
                        type="email"
                        v-model="form.email"
                        @blur="$v.email.$touch"
                        autocomplete="one-time-code"
                        placeholder="Введите E-mail"
                        class="form-input form-input--email"
                        :class="{ 'form-input--error': $v.email.$error }"
                    />
                    <span v-if="$v.email.$error" class="inline-block mt-2 text-sm text-red-600">{{ $v.email.$errors[0].$message }}</span>
            </label>

            <label class="mb-4 form-field">
                <span class="form-label">Пароль</span>
                <input 
                    type="password" 
                    v-model="form.password"
                    @blur="$v.password.$touch"
                    @focus="$v.password.$touch"
                    autocomplete="one-time-code" 
                    placeholder="Введите пароль"
                    class="form-input form-input--password"
                    :class="{ 'form-input--error': $v.password.$error }"
                />
                <span v-if="$v.password.$error" class="inline-block mt-2 text-sm text-red-600">{{ $v.password.$errors[0].$message }}</span>
            </label>

            <label class="mb-6 form-field">
                <span class="form-label">Повторите пароль</span>
                <input 
                    type="password" 
                    autocomplete="one-time-code"
                    placeholder="Повторите пароль" 
                    v-model="form.confirmPassword" 
                    @blur="$v.confirmPassword.$touch"
                    class="form-input form-input--password"
                    :class="{ 'form-input--error': $v.password.$error }"
                />
                <span v-if="$v.confirmPassword.$error" class="inline-block mt-2 text-sm text-red-600">{{ $v.confirmPassword.$errors[0].$message }}</span>
            </label>

            <Button @click="authUser" label="Зарегистрироваться" class="py-3 w-full btn btn--primary" :icon="{
                class: 'btn__icon--right',
                name: 'octicon:person-add-24'
            }" />
        </div>

        <div class="flex justify-center">
            <span class="mr-1 text-sm text-slate-500">Уже есть аккаунт?</span>
            <button @click="authStore.toggleSignInModal" class="text-blue-700 text-sm">Войти</button>
        </div>
    </VueFinalModal>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { VueFinalModal } from 'vue-final-modal'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'

const form = reactive({
    email: '',
    password: '',
    confirmPassword: ''
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
        },
        confirmPassword: { 
            required: helpers.withMessage('Поле повторного пароля обязательна к заполнению', required),
            sameAs: helpers.withMessage('Пароли не совпадают', sameAs(form.password))
        }
    }
})

const $v = useVuelidate(rules, form)

const authStore = useAuthentication()
const { isSignUpModalVisible } = storeToRefs(authStore)

async function authUser() { }

</script>