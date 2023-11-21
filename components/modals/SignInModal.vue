<template>
    <UModal v-model="isSigninModalShown" @closed="eraseFilledData(form)">
        <div class="p-4">
            <div class="mb-5 modal-content__header">
                <h2 class="mb-2 font-medium text-center text-xl text-black">Вход в аккаунт</h2>
                <p class="max-w-lg text-center mx-auto text-slate-500">Войдите в свой аккаунт для того чтобы получить больше возможностей!</p>
            </div>

            <Form class="mb-4 max-w-sm mx-auto">
                <div class="mb-4 form-field">
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
            
                <div class="mb-2 form-field">
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

                <div class="mb-4 flex justify-between">
                    <NuxtLink to="/" class="text-blue-700 text-sm">Забыли пароль?</NuxtLink>
                </div>

                <UButton @click="handleSignInFormSubmit" block trailing :loading="isAuthorizing" size="lg" class="btn" icon="i-octicon-person-24">
                    Войти
                </UButton>

                <transition-fade>
                    <div v-if="errors.type" class="mt-4 flex justify-center">
                        <span class="text-sm text-red-500 text-center">{{ $t(`authorization.${[errors.type]}`) }}</span>
                    </div>
                </transition-fade>
            </Form>

            <div class="my-4 flex justify-center">
                <span class="mr-1 text-sm text-slate-500">Все ещё нет аккаунта?</span>
                <button @click="swapModals" class="text-blue-700 text-sm">Зарегистрироваться</button>
            </div>

            <AuthOptions />
        </div>  
    </UModal>
</template>

<script setup lang="ts">
const form = reactive({ email: '', password: '' })

const errors = reactive({ type: '' })

const rules = validationRules

const { signIn } = useAuth()
const { isAuthorizing } = storeToRefs(useAuthStore())
const { showSignupModal, hideSigninModal } = useModals()
const { isSigninModalShown } = storeToRefs(useModalsStore())

function swapModals() {
    showSignupModal()
    hideSigninModal()
}

async function handleSignInFormSubmit() {
    const res = await signIn({ email: form.email, password: form.password })
    
    if (res.error.value) {
        errors.type = res.error.value.data.type
    }
    

    setTimeout(() => {
        errors.type = ''
    }, 2500)
}

</script>