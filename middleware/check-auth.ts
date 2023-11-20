export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = storeToRefs(useAuthStore())

    console.log(to.path)

})