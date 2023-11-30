<template>
    <LazyUModal v-model="isRecoveryModalVisible">

        <Form class="px-4 pt-4 pb-8">

            <div class="mb-4 flex flex-col">
                <span class="mb-2 font-medium text-lg text-center text-slate-700">Запрос на восстановление</span>
                <p class="text-center text-slate-400">
                    Введите адрес электронной почты, который вы использовали при регистрации, и мы вышлем вам инструкции по
                    сбросу пароля
                </p>
            </div>

            <div class="mb-4">
                <span class="form-label">E-mail <sup class="text-red-500">*</sup></span>
                <Field v-model="recoveryEmail" v-slot="{ field, meta }" :rules="rules.fields.email" name="email">
                    <UInput 
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

            <transition-fade>
                <div v-if="errors.type" class="my-3 flex justify-center">
                    <span class="text-sm text-red-500 text-center">{{ $t(`authorization.${[errors.type]}`) }}</span>
                </div>
            </transition-fade>

            <div class="space-y-2">
                <UButton @click="requestRecovery" :loading="isRecoveryRequesting" block trailing class="btn py-3" icon="i-ion-refresh-outline">
                    Запросить восстановление
                </UButton>
                <UButton @click="isRecoveryModalVisible = false" block trailing variant="soft" class="btn py-3">
                    Отменить
                </UButton>
            </div>

        </Form>

    </LazyUModal>
</template>

<script setup lang="ts">

const toast = useToast()
const rules = validationRules
const errors = ref({ type: '' })
const recoveryEmail = ref<string>('')
const { hideRecoveryModal } = useModals()
const { requestPasswordRecovery } = useAuth()
const { isRecoveryRequesting } = storeToRefs(useAuthStore())
const { isRecoveryModalVisible } = storeToRefs(useModalsStore())

async function requestRecovery() {
    const { status, error } = await requestPasswordRecovery(recoveryEmail.value)

    if (error.value) {
        errors.value.type = error.value.data.type

        setTimeout(() => {
            errors.value.type = ''
        }, 2500)
    }

    if (status.value === 'success') {
        hideRecoveryModal()
        toast.add({ 
            title: 'Проверьте Email',
            closeButton: { variant: 'ghost' },
            description: 'Запрос на восстановление пароля успешно отправлен, проверьте свою электронную почту' 
        })
    }

}

</script>