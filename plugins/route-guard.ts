import { useGlobalStore } from '@/stores/global'

export default defineNuxtPlugin(() => {

    const { setMenuState } = useGlobalStore()

    addRouteMiddleware((to, from) => {
        setMenuState(false)
    })
})