<template>

    <Head>
        <Title>Восстановление пароля</Title>
    </Head>

    <section class="h-full">
        <div class="container mx-auto h-full">
            <div class="h-full flex items-center justify-center">
                <Form class="mb-6 max-w-md w-full">

                    <div class="mb-6 flex flex-col items-center">
                        <h4 class="mb-2 font-medium text-slate-700 text-xl">Изменение пароля</h4>
                        <p class="text-center text-slate-500 text-sm">В целях безопасности мы не храним ваш пароль. Так что можете быть уверены, что мы никогда не отправим ваш пароль по электронной почте.</p>
                    </div>

                    <div class="mb-4">
                        <Field v-model="form.newPassword" v-slot="{ field, meta }" :rules="rules.fields.password" name="password">
                            <span class="form-label">Пароль <sup class="text-red-500">*</sup></span>
                            <UInput
                                required
                                size="lg"
                                v-bind="field"
                                type="password"
                                icon="i-octicon-lock-24"
                                placeholder="Введите новый пароль"
                                :color="meta.touched && !meta.valid ? 'red' : 'white'"
                            />
                        </Field>

                        <transition-slide>
                            <ErrorMessage name="password" class="text-xs text-red-500" />
                        </transition-slide>
                    </div>

                    <div class="mb-4">
                        <Field v-model="form.newPasswordRepeat" v-slot="{ field, meta }" :rules="rules.fields.passwordConfirmation" name="password-confirmation">
                            <span class="form-label">Повторите пароль <sup class="text-red-500">*</sup></span>
                            <UInput
                                required
                                size="lg"
                                v-bind="field"
                                type="password"
                                icon="i-octicon-lock-24"
                                placeholder="Повторите новый пароль"
                                :color="meta.touched && !meta.valid ? 'red' : 'white'"
                            />
                        </Field>

                        <transition-slide>
                            <ErrorMessage name="password-confirmation" class="text-xs text-red-500" />
                        </transition-slide>
                    </div>

                    <transition-fade>
                        <div v-if="errors.type" class="my-4 flex justify-center">
                            <span class="text-sm text-red-500 text-center">{{ $t(`authorization.${[errors.type]}`) }}</span>
                        </div>
                    </transition-fade>

                    <UButton @click="recoverPassword" block trailing :loading="isRecoveryRequesting" size="lg" class="btn" icon="i-ion-lock-closed-outline">
                        Изменить пароль
                    </UButton>
        
                </Form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

const route = useRoute()
const toast = useToast()
const router = useRouter()
const rules = validationRules
const errors = ref({ type: '' })
const { changePassword } = useAuth()
const { isRecoveryRequesting } = storeToRefs(useAuthStore())

const form = ref({
    newPassword: '',
    newPasswordRepeat: ''
})

const isPasswordsEqual = computed(() => {
    return form.value.newPassword === form.value.newPasswordRepeat
})

function timeout() {
    return setTimeout(() => {
        errors.value.type = ''
    }, 2500)
}

async function recoverPassword() {

    if (!isPasswordsEqual.value) {

        errors.value.type = 'passwords_not_equal'

        timeout()
        
        return false
    }

    if (form.value.newPassword.length <= 8) {
        errors.value.type = 'passwords_length'

        timeout()

        return false
    }

    const payload = {
        email: String(route.query.email),
        token: String(route.query.token),
        password: form.value.newPassword
    }

    const { error, status } = await changePassword(payload)

    if (error.value) {
        errors.value.type = error.value.data.type
    }

    if (!error.value && status.value === 'success') {
        router.push('/')
        toast.add({ 
            title: 'Пароль успешно обновлен',
            closeButton: { variant: 'ghost' },
            description: 'Ваш пароль успешно обновлен, попробуйте войти в свой аккаунт с новым паролем' 
        })
    }

    timeout()
}

</script>