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

const { getUser } = useUser()
const { getUserTasks } = useTasks()
const { isAuthenticated } = storeToRefs(useAuthStore())

onBeforeMount(async () => {
    if (isAuthenticated.value) {
        const res = await getUser()

        watch(() => res.data.value, async (newVal) => {
            if (newVal) {
                await getUserTasks({ customParams: { username: newVal.data.username } })
            }
        })
    }
})

</script>