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

const timeout = ref<any>(null)

const { getUser } = useUser()
const { getUserTasks } = useTasks()

onBeforeMount(async () => {
    const res = await getUser()

    watch(() => res.data.value, async (newVal) => {
        if (newVal) {
            await getUserTasks({ customParams: { username: newVal.data.username } })
        }
    })
})

</script>