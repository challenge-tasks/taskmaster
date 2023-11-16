<template>
    <div class="wrapper">
        
        <Header />
        
        <main>
            <slot />
        </main>

        <SignInModal />
        <SignUpModal />
        <UNotifications />
    </div>
</template>

<script setup lang="ts">

// onBeforeMount(() => {
//     const { getUser } = useUser()
//     getUser()
// })

</script>