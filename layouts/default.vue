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

const { getUser } = useUser()

await getUser()

</script>