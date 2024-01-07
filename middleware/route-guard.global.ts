export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs(useAuthStore())

    if (!isAuthenticated.value && (to.name === 'profile' || to.name === 'profile-id')) {
        return navigateTo('/')
    }

})