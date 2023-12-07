export default defineAppConfig({
    ui: {
        primary: 'royalBlue',

        button: {
            font: 'font-normal',
            rounded: 'rounded-3xl',
            default: {
                loadingIcon: 'i-ant-design-loading-3-quarters-outlined'
            }
        },

        notifications: {
            position: 'bottom-0 top-auto',
        },

        notification: {

            description: 'leading-5',

            default: {
                color: 'green',
                
                closeButton: {
                    variant: "ghost",
                    padded: true
                },

                actionButton: {
                    size: 'lg'
                }
            },

            progress: {
                background: "bg-{color}-400 dark:bg-{color}-400"
            }
        },

        skeleton: {
            base: "animate-pulse"
        },

        tooltip: {
            width: 'max-w-xs',
            base: '[@media(pointer:coarse)]:hidden px-2 py-1 h-auto whitespace-normal text-xs font-normal relative'
        }
    }
})