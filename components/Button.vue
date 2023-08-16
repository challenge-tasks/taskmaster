<template>
    <button :type="type" class="py-2 btn">
        
        <transition-fade v-if="loading">
            <Loader />
        </transition-fade>

        <span :class="{ 'opacity-0 invisible': loading }" class="transition-all flex gap-3 items-center">
            <span class="btn__label">{{ label }}</span>
            <Icon v-if="icon" :name="icon.name" class="btn__icon" :class="icon.class" />
        </span>

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
            type: String
        },

        icon: {
            type: Object,
        },

        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>