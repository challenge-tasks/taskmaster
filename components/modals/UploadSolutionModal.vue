<template>
    <VueFinalModal v-model="isModalVisible" v-bind="modalConfig">

        <div class="mb-4 p-3 transition linear delay-150 w-full h-56 flex items-center justify-center relative rounded-md border-2 hover:border-gray-700 border-gray-400 border-dashed">
            <div class="flex flex-col gap-2 items-center justify-center">
                <ClientOnly>
                    <span class="flex items-center mb-2">
                        <UIcon name="i-ant-design-cloud-upload-outlined" class="text-slate-400 w-10 h-10" />
                    </span>
                </ClientOnly>
                <span class="max-w-md text-center text-slate-400">Выберите zip или rar файл где содержится решение по заданию и загрузите его для проверки</span>
            </div>
            <input type="file" accept=".zip,.rar,.7z,.gz" maxlength="1" ref="fileInput" @change="handleFile" class="opacity-0 absolute top-0 left-0 right-0 bottom-0">
        </div>

        <div v-if="form.file" class="flex justify-between gap-2 mb-4 bg-slate-50 py-3 px-2 rounded-md">
            <span class="mr-auto text-slate-600">{{ form.file.name }}</span>
            <span class="ml-auto text-slate-600">{{ fileSize }}</span>
        </div>

        <div class="flex flex-col xs:flex-row justify-end gap-2">
            <UButton @click="cancelUpload" variant="soft" class="w-full xs:w-auto py-3 btn order-1 xs:order-0">
                Отменить
            </UButton>
            <UButton @click="uploadFileToServer" trailing :disabled="!form.file" :loading="isSolutionUploading" class="order-0 xs:order-1 w-full xs:w-auto py-3 btn btn--primary">
                {{ isSolutionUploading ? 'Загружаем' : 'Загрузить решение' }}
            </UButton>
        </div>

    </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

interface PropsInterface {
    taskSlug: string
    modelValue: boolean
}

const { uploadTaskSolution } = useTasks()
const { isSolutionUploading } = storeToRefs(useTasks())

const props = defineProps<PropsInterface>()
const emit = defineEmits<{ (e: 'update:modelValue', id: boolean): void }>()

const modalConfig = ref({
    class: "modal",
    lockScroll: true,
    overlayTransition: "vfm-fade",
    contentTransition: "vfm-fade",
    contentClass: "max-w-xl w-full bg-white rounded-md px-5 py-4"
})

const fileInput = ref<HTMLFormElement>()
const form = reactive({ file: null } as { file: File | null })

const fileSize = computed(() => {
    if (form.file) {
        const kilobytes = form.file.size / 1024
        const megabytes = kilobytes / 1024

        if (megabytes >= 1) {
            return megabytes.toFixed(2) + ' MB'
        } else {
            return kilobytes.toFixed(2) + ' KB'
        }

    
    } else {
        return 0
    }
})

const isModalVisible = computed({
    get() {
        return props.modelValue
    },

    set(newVal) {
        return emit('update:modelValue', newVal)
    }
})

function handleFile($event: Event) {
    if ($event.target) {
        const target = $event.target as HTMLInputElement
        
        if (target.files) {
            const [ _file ] = target.files as FileList
            form.file = _file
        }
    }
}

function cancelUpload() {
    isModalVisible.value = false
}

async function uploadFileToServer() {

    if (!form.file) {
        return false
    }

    const body = new FormData()
    body.append('file', form.file, form.file.name)

    const res = await uploadTaskSolution(props.taskSlug, { body })

    if (res && res.value && res.value.success) {
        isModalVisible.value = false
    }
}

watch(() => props.modelValue, (newVal) => {
    if (!newVal) {
        form.file = null
    }
})

</script>