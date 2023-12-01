<template>
    <LazyUModal v-model="isProviderAuthErrorModalVisible">
        <div class="gap-2 flex items-center justify-between p-3">
            <span class="font-medium text-md text-slate-800">Ошибка авторизации через выбранный сервис</span>
            <UButton variant="ghost" @click="hideProviderAuthErrorModal" icon="i-ion-close-outline" />
        </div>

        <div class="px-3 pb-3">
            <p class="text-sm leading-6 text-slate-500">
                Не удалось авторизоваться через выбранный вами сервис, так как в системе уже сущетсвует пользователь с таким
                Email (неподтвержденный) или именем пользователя который указан в выбранном вами сервисе. Если Email подтвержденный, то данные с сервиса и нашего сайта будут слиты воедино.
            </p>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">

const { hideProviderAuthErrorModal } = useModals()
const { isProviderAuthErrorModalVisible } = storeToRefs(useModalsStore())

</script>