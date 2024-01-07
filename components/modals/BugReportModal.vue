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
                <UButton @click="sendReport" :loading="isBugReporting" :disabled="isBugReporting" label="Отправить" size="lg" class="btn rounded-md" />
            </div>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">

const { t } = useI18n()
const toast = useToast()
const { sendBugReport } = useBugReport()
const { setBugReportModalState } = useModalsStore()
const { isBugReporting } = storeToRefs(useGlobalStore())
const { isBugReportModalVisible } = storeToRefs(useModalsStore())

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

    const response = await sendBugReport(report.value)

    if (response.data.value && response.data.value.success) {

        toast.add({
            title: 'Ваша заявка отправлена',
            closeButton: { variant: 'ghost' },
            description: 'Спасибо, что помогли улучшить нашу платформу'
        })
        
    } 
    
    if (response.error.value) {
        toast.add({
            color: 'red',
            closeButton: { variant: 'ghost' },
            title: t(`reports.${response.error.value.data.type}`),
            description: t('reports.too_many_requests_desc')
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