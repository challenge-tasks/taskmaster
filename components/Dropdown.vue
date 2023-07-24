<template>
    <div ref="dropdown" class="dropdown" :class="{ 'dropdown--dropped': isDropped }">
        <span class="dropdown__placeholder" @click="toggleDropdown">
            <span class="dropdown__label">{{ label }}</span>
            <Icon :name="icon.name" class="dropdown__icon" :class="icon.class" />
        </span>

        <div class="dropdown__options">
            <slot name="options" />
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps({
    icon: {
        type: Object,
        required: true
    },

    label: {
        type: String,
        required: false
    }
})

const dropdown = ref(null)
const isDropped = ref(false)

function toggleDropdown() {
    isDropped.value = !isDropped.value
}

onClickOutside(dropdown, () => isDropped.value = false)

</script>