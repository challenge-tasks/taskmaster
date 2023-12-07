<template>
    <div class="wrapper">

        <Header />

        <main>
            <slot />
        </main>

        <Footer />

        <SignInModal />
        <SignUpModal />
        <RecoveryModal />
        <BugReportModal />

        <LazyUNotifications>
            <template v-slot:description="{ description }">
                <span v-html="description" />
            </template>
        </LazyUNotifications>

        <NuxtLoadingIndicator color="#4f46e5" class="nuxt-loading-indicator" />
    </div>
</template>

<script setup lang="ts">

const { getUser } = useUser()
const { getUserTasks } = useTasks()
const { startCountdown } = useCountdown()
const { user } = storeToRefs(useUserStore())
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

watch(() => user.value.last_confirmation_notification_sent_at, (newVal) => {
    if (Object.keys(user.value).length) {
        startCountdown(newVal)
    }
}, { immediate: true })

</script>