<template>
    <div class="wrapper">
        
        <Header />
        
        <main>
            <slot />
        </main>

        <SignInModal />
        <SignUpModal />
    
    </div>
</template>

<script setup lang="ts">
import SignInModal from '@/components/modals/SignInModal.vue'
import SignUpModal from '@/components/modals/SignUpModal.vue'

onBeforeMount(() => {
    const { getUser } = useUser()
    getUser()
})

</script>