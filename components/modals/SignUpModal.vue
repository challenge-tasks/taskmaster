<template>
    <VueFinalModal v-model="isSignUpModalVisible" overlayTransition="vfm-fade" contentTransition="vfm-fade" :lockScroll="true" @closed="eraseFilledData(form)" class="modal" content-class="modal-content">
        <div class="mb-5 modal-content__header">
            <h2 class="mb-2 font-medium text-center text-xl text-black">Регистрация аккаунта</h2>
            <p class="max-w-lg text-center mx-auto text-slate-500">Зарегистрируйтесь для того чтобы получить больше возможностей!</p>
        </div>

        <Form class="mb-6 max-w-sm mx-auto modal-content__body">
            
            <div class="mb-3">
                <span class="form-label">E-mail <sup class="text-red-500">*</sup></span>
                <Field v-model="form.email" v-slot="{ field, meta }" :rules="rules.fields.email" name="email">
                    <UInput
                        size="lg"
                        type="email"
                        v-bind="field"
                        icon="i-octicon-mail-24"
                        placeholder="Введите электронную почту"
                        :color="meta.touched && !meta.valid ? 'red' : 'white'"
                    />
                </Field>
                
                <transition-slide>
                    <ErrorMessage name="email" class="text-xs text-red-500" />
                </transition-slide>
            </div>

            <div class="mb-3">
                <span class="form-label">Имя пользователя <sup class="text-red-500">*</sup></span>
                <Field v-model="form.username" v-slot="{ field, meta }" :rules="rules.fields.username" name="username">
                    <UInput
                        size="lg"
                        type="text"
                        v-bind="field"
                        icon="i-octicon-link-24"
                        placeholder="Придумайте имя пользователя"
                        :color="meta.touched && !meta.valid ? 'red' : 'white'"
                    />
                </Field>
                
                <transition-slide>
                    <ErrorMessage name="username" class="text-xs text-red-500" />
                </transition-slide>
            </div>

            <div class="mb-3">
                <span class="form-label">Пароль <sup class="text-red-500">*</sup></span>
                
                <Field v-model="form.password" v-slot="{ field, meta }" :rules="rules.fields.password" name="password">
                    <UInput
                        size="lg"
                        v-bind="field"
                        type="password"
                        icon="i-octicon-lock-24"
                        placeholder="Введите пароль"
                        :color="meta.touched && !meta.valid ? 'red' : 'white'"
                    />
                </Field>
                
                <transition-slide>
                    <ErrorMessage name="password" class="text-xs text-red-500" />
                </transition-slide>
            </div>


            <UButton @click="handleSignupFormSubmit" block trailing :loading="isFetching" size="lg" class="btn" icon="i-octicon-person-add-24">
                Зарегистрироваться
            </UButton>
        
            <transition-fade>
                <div v-if="errors.type" class="mt-4 flex justify-center">
                    <span class="text-sm text-red-500 text-center">{{ $t(`authorization.${[errors.type]}`) }}</span>
                </div>
            </transition-fade>
        </Form>

        <div class="mb-4 flex justify-center">
            <span class="mr-1 text-sm text-slate-500">Уже есть аккаунт?</span>
            <button @click="authModals.toggleSignInModal" class="text-blue-700 text-sm">Войти</button>
        </div>

        <AuthOptions />
    </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const form = reactive({
    email: '',
    username: '',
    password: ''
})

const rules = validationRules

const errors = reactive({ type: '' })

const { signUp } = useUserAuth()
const authModals = useAuthModals()

const { isFetching } = storeToRefs(useUserAuth())
const { isSignUpModalVisible } = storeToRefs(authModals)

async function handleSignupFormSubmit() {
    const payload = {
        email: form.email,
        username: form.username,
        password: form.password
    }

    const res = await signUp(payload)

    errors.type = res?.error?.value?.data.type

    setTimeout(() => {
        errors.type = ''
    }, 2500)
    
}
 
</script>