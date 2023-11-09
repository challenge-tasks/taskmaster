import { User } from "types"
import { useUserAuth } from './userAuth'

export const useUser = defineStore('user', () => {
    const user = reactive({ data: {} as User })

    const isFetching = ref(false)
    const config = useRuntimeConfig()

    async function getUser() {

        
        try {

            const { rToken } = useUserAuth()
            
            if (!rToken) {
                return false
            }

            isFetching.value = true

            const res = await useFetch<{ data: User }>(config.public.apiBaseUrl + '/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${rToken}`
                },
                server: false
            })

            watch(() => res.status.value, (newVal) => {
                if (newVal === 'success') {
                    user.data = res.data.value?.data!
                }
            })

        } catch (error) {

            console.log(error)

        } finally {
            isFetching.value = false
        }
    }
    
    async function updateUser(data: User | { username: string, email: string }) {
        try {

            const { rToken } = useUserAuth()

            if (!rToken) {
                return false
            }

            isFetching.value = true

            await useFetch<{ data: User }>(config.public.apiBaseUrl + '/profile', {
                method: 'PUT',
                body: data,
                headers: {
                    Authorization: `Bearer ${rToken}`
                }
            })

        } catch (error) {

            console.log(error)

        } finally {
            isFetching.value = false
        }
    }

    return {
        user,
        getUser,
        updateUser
    }
})

