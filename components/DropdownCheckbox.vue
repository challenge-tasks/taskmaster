<template>
    <div ref="dropdown" class="dropdown" :class="{ 'dropdown--dropped': isDropped }">
        <span class="dropdown__placeholder" @click="toggleDropdown">
            <span class="dropdown__label">{{ label }}</span>
            <Icon :name="icon.name" class="dropdown__icon" :class="icon.class" />
        </span>

        <span class="dropdown__options">
            <span v-for="option in options" class="dropdown__option">
                <Checkbox :value="options.value" :label="option.label" />
            </span>
        </span>
    </div>
</template>

<script setup lang="ts">

defineProps({
    icon: {
        type: Object,
        required: true
    },
    label: String,
    options: {
        type: Object,
        required: true
    }
})

const dropdown = ref(null)
const isDropped = ref(false)

function toggleDropdown() {
    isDropped.value = !isDropped.value
}

onClickOutside(dropdown, () => isDropped.value = false)

</script>