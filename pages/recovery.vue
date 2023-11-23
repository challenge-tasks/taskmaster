<template>
    <section class="h-full">
        <div class="container mx-auto h-full">
            <div class="h-full flex items-center justify-center">
                <Form class="mb-6 max-w-md w-full">

                    <div class="mb-6 flex flex-col items-center">
                        <h4 class="mb-2 font-medium text-slate-700 text-xl">Изменение пароля</h4>
                        <p class="text-center text-slate-500">В целях безопасности мы не храним ваш пароль. Так что можете быть уверены, что мы никогда не отправим ваш пароль по электронной почте.</p>
                    </div>

                    <div class="mb-4">
                        <span class="form-label">E-mail <sup class="text-red-500">*</sup></span>
                        <UInput
                            size="lg"
                            type="email"
                            v-model="form.email"
                            icon="i-octicon-mail-24"
                            placeholder="Введите электронную почту"
                        />
                    </div>

                    <div class="mb-4">
                        <span class="form-label">Пароль <sup class="text-red-500">*</sup></span> 
                        <UInput
                            required
                            size="lg"
                            type="password"
                            v-model="form.newPassword"
                            icon="i-octicon-lock-24"
                            placeholder="Введите новый пароль"
                        />
                    </div>


                    <UButton @click="recoverPassword" block trailing :loading="isRecoveryRequesting" size="lg" class="btn" icon="i-ion-lock-closed-outline">
                        Изменить пароль
                    </UButton>
                
                    <transition-fade>
                        <div v-if="errors.type" class="mt-4 flex justify-center">
                            <span class="text-sm text-red-500 text-center">{{ $t(`authorization.${[errors.type]}`) }}</span>
                        </div>
                    </transition-fade>
                </Form>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { IBaseErrorResponse } from '@/types'

const route = useRoute()
const toast = useToast()
const router = useRouter()
const errors = ref({ type: '' })
const { changePassword } = useAuth()
const { isRecoveryRequesting } = storeToRefs(useAuthStore())

const form = ref({
    email: '',
    newPassword: ''
})

async function recoverPassword() {
    const payload = {
        email: form.value.email,
        token: String(route.query.token),
        password: form.value.newPassword,
    }

    const { error, status } = await changePassword(payload)

    if (error.value) {
        errors.value.type = error.value.data.type

        setTimeout(() => {
            errors.value.type = ''
        }, 2500)
    }

    if (!error.value && status.value === 'success') {
        router.push('/')
        toast.add({ title: 'Пароль успешно обновлен', description: 'Ваш пароль успешно обновлен, попробуйте войти в свой аккаунт с новым паролем' })
    }
}

onMounted(() => {
    form.value.email = String(route.query.email)
})

</script>