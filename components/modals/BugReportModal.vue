<template>
    <LazyUModal v-model="isBugReportModalVisible">
        <div class="p-4">
            <div class="mb-4 flex items-center justify-between">
                <h4 class="font-medium">Сообщить о баге</h4>
                <UButton variant="ghost" @click="controlBugReportModal(false)" icon="i-ion-close-outline" />
            </div>
            <div class="mb-4">
                <UTextarea v-model:model-value="report" :rows="5" required placeholder="Опишите проблему которую вы заметили..." autoresize />
            </div>
            <div class="flex justify-end">
                <UButton @click="sendReport" :disabled="isBugReporting" label="Отправить" size="lg" class="btn rounded-md" />
            </div>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">
const { sendBugReport } = useBugReport()
const { setBugReportModalState } = useModalsStore()
const { isBugReporting } = storeToRefs(useGlobalStore())
const { isBugReportModalVisible } = storeToRefs(useModalsStore())

const toast = useToast()

const report = ref<string>('')

async function sendReport() {
    
    if (!report.value) {
        toast.add({
            title: 'Опишите свою проблему', 
            closeButton: { variant: 'ghost' },
            description: 'Пожалуйста опишите свою проблему подробно, чтобы разработчики могли исправить ее как можно быстрее' 
        })

        return false
    }

    const { data } = await sendBugReport(report.value)

    if (data.value && data.value.success) {

        toast.add({
            title: 'Ваша заявка отправлена',
            closeButton: { variant: 'ghost' },
            description: 'Спасибо, что помогли улучшить нашу платформу'
        })
        
    } else {
        toast.add({
            title: 'Что-то пошло не так',
            closeButton: { variant: 'ghost' },
            description: 'Возникла ошибка при отправке вашей заяки, пожалуйста свяжитесь с нашим Бэкенд разработчиком @ramatovzulfikor'
        })
    }

    controlBugReportModal(false)

}

function controlBugReportModal(payload: boolean) {
    setBugReportModalState(payload)

    if (!payload) {
        report.value = ''
    } 
}

</script>