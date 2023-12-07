import type { AsyncData } from "nuxt/app"

export function useBugReport() {

    const { setBugReportingState } = useGlobalStore()

    async function sendBugReport(payload: string): Promise<AsyncData<{ success: boolean } | null, { success: boolean } | any>> {

        try {

            setBugReportingState(true)

            const res = await useAsyncData<{ success: boolean }>('register', () => $fetch('/api/report', { method: 'POST', body: { report: payload } }))

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