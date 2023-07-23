<template>
    <label class="checkbox">
        <input type="checkbox" :value="value" class="hidden">
        <span class="checkbox__rect">
            <Icon :name="iconNameOrDefault" />
        </span>
        <span class="checkbox__label">{{ label }}</span>
    </label>
</template>

<script setup lang="ts">

const props = defineProps(['value', 'label', 'iconName'])

const iconNameOrDefault = computed(() => props.iconName ? props.iconName : 'octicon:check-16')

</script>