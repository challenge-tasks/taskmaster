<template>
    <button :type="type" class="py-2 btn">
        <span class="btn__label">{{ label }}</span>
        <Icon v-if="icon" :name="icon.name" class="btn__icon" :class="icon.class" />
    </button>
</template>

<script lang="ts">
export default {
    props: {
        type: {
            type: String,
            default: 'button'
        },

        label: {
            type: String,
            required: true
        },

        icon: {
            type: Object,
        }
    }
}
</script>