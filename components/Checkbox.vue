<template>
    <label class="checkbox">
        <input type="checkbox" v-model="checkboxState" :value="customValue" class="hidden">
        <span class="checkbox__rect">
            <Icon :name="iconNameOrDefault" />
        </span>
        <span class="checkbox__label">{{ label }}</span>
    </label>
</template>

<script setup lang="ts">

const emit = defineEmits(['update:model-value'])

const props = defineProps(['customValue', 'modelValue', 'label', 'iconName'])
const iconNameOrDefault = computed(() => props.iconName ? props.iconName : 'octicon:check-16')

const checkboxState = computed({
    get() { return props.modelValue },
    set(value: string) { emit('update:model-value', value) }
})

</script>