<template>
    <label class="radio">
        <input type="radio" v-model="radioState" :name="name" :value="customValue" class="hidden">
        <span class="radio__circle">
            <Icon :name="iconNameOrDefault" />
        </span>
        <span class="radio__label">{{ label }}</span>
    </label>
</template>

<script setup lang="ts">

const emit = defineEmits(['update:model-value'])
const props = defineProps(['customValue', 'modelValue', 'label', 'iconName', 'name'])
const iconNameOrDefault = computed(() => props.iconName ? props.iconName : 'octicon:dot-fill-24')

const radioState = computed({
    get() { return props.modelValue },
    set(value) { emit('update:model-value', value) }
})

</script>