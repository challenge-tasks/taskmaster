<template>
    <div class="wrapper">
        <Header />
        <main>
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
</script>