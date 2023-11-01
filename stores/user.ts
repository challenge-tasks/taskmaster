import { User } from "types"

export const useUser = defineStore('user', () => {

    const user = reactive({
        data: {} as User
    })

    const isFetching = ref(false)
    const token = useCookie('token')
    const config = useRuntimeConfig()

    async function getUser() {
        try {

            if (Object.keys(user.data).length) {
                return false
            }

            isFetching.value = true

            const res = await useFetch<{ data: User }>(config.public.apiBaseUrl + '/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token.value}`
                },
                server: false
            })

            watch(() => res.status.value, (newValue) => {

                if (newValue === 'success') {
                    user.data = res.data.value?.data!
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
        getUser
    }
})

