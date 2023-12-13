<template>
    <LazyUModal v-model="isEmailModalShown">
        <Form class="mb-6 mx-5">

            <div class="my-4">
                <h2 class="mb-2 font-medium text-center text-xl text-black">Укажите электронную почту</h2>
                <p class="max-w-lg text-center mx-auto text-slate-500">
                    Мы обнаружили что на вашем аккаунте Github не указана
                    публичная электронная почта, укажите почту чтобы завершить авторизацию.
                </p>
            </div>

            <div class="mb-5">
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

            <UButton @click="addEmail" block size="lg" class="btn">Сохранить</UButton>

            <transition-fade>
                <div v-if="errors.type" class="mt-4 flex justify-center">
                    <span class="text-sm text-red-500 text-center">{{ $t(`authorization.${[errors.type]}`) }}</span>
                </div>
            </transition-fade>
        </Form>
    </LazyUModal>
</template>

<script setup lang="ts">

const { isEmailModalShown } = storeToRefs(useModalsStore())

const rules = validationRules

const errors = ref({
    type: ''
})

const form = ref({
    email: ''
})

function addEmail() { }

</script>