import type { IUser } from "@/types"
import type { AsyncData } from "nuxt/app"
import type { FetchOptions } from 'ofetch'

export function useUser() {

    const { $api } = useNuxtApp()
    const { userToken } = storeToRefs(useUserStore())
    const { setUser, setUserUpdatingStatus } = useUserStore()

    async function getUser(): Promise<AsyncData<{ data: IUser } | null, Error | null>> {

        try {

            if (!userToken || !userToken.value) {
                throw new Error('User token is missing, log in and try again')
            }

            const res = await useAsyncData<{ data: IUser }, Error | null>('profile', () => $api('/profile', { method: 'GET' }))

            watch(() => res.status.value, (newVal) => {
                if (res.data.value && newVal === 'success') {
                    setUser(res.data.value.data)
                }
            })

            return res

        } catch (error: any) {
            console.log(error)
            return error
        }

    }

    async function updateUser(options: FetchOptions<'json'>): Promise<AsyncData<{ success: boolean } | null, Error | null>> {

        try {

            setUserUpdatingStatus(true)

            const res = await useAsyncData<{ success: boolean }>('profile-update', () => $api('/profile', {
                method: 'PUT',
                ...options 
            }))

            return res

        } catch (error: any) {

            console.log(error)
            return error

        } finally {
            setUserUpdatingStatus(false)
        }

    }

    return {
        getUser,
        updateUser
    }

}