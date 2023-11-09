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

onBeforeMount(() => {
    const { getUser } = useUser()
    getUser()
})

</script>