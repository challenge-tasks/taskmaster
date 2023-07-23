<template>
    <div ref="dropdown" class="dropdown" :class="{ 'dropdown--dropped': isDropped }">
        <span class="dropdown__placeholder" @click="toggleDropdown">
            <span class="dropdown__label">{{ label }}</span>
            <Icon :name="icon.name" class="dropdown__icon" :class="icon.class" />
        </span>

        <span class="dropdown__options">
            <span v-for="option in options" class="dropdown__option">
                <label class="dropdown-checkbox">
                    <input type="checkbox" :value="option.value" class="hidden">
                    <span class="dropdown-checkbox__check">
                        <Icon name="octicon:check-16" />
                    </span>
                    <span class="dropdown-checkbox__label">{{ option.label }}</span>
                </label>
            </span>
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
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