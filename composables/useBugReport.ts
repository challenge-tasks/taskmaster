import type { AsyncData } from "nuxt/app"
import type { IBaseErrorResponse } from "@/types"

export function useBugReport() {

    const { $api } = useNuxtApp()
    const { setBugReportingState } = useGlobalStore()

    async function sendBugReport(payload: string): Promise<AsyncData<{ success: boolean } | null, IBaseErrorResponse | any>> {

        try {

            setBugReportingState(true)

            const res = await useAsyncData<{ success: boolean } | null, IBaseErrorResponse | any>('register', () => $api('/reports', { method: 'POST', body: { text: payload } }))
            
            return res

        } catch (error: any) {

            console.log(error)
            return error

        } finally {
            setBugReportingState(false)
        }
    }

    return {
        sendBugReport
    }
}