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
            position: 'top-0 bottom-auto'
        },

        tooltip: {
            width: 'max-w-xs',
            base: '[@media(pointer:coarse)]:hidden px-2 py-1 h-auto whitespace-normal text-xs font-normal relative'
        }
    }
})