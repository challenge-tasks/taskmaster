import type { ITelegramMessageResponse } from "@/types"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const chatId = config.telegram_chat_id
    const botToken = config.telegram_bot_token

    const { report } = await readBody(event)

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    try {
        
        const res = await $fetch<ITelegramMessageResponse>(url, {
            method: 'POST',
            params: {
                text: report,
                chat_id: chatId
            }
        })

        if (res.ok) {
            return {
                success: true
            }
        }

    } catch (error) {
        return {
            success: false
        }
    }

})