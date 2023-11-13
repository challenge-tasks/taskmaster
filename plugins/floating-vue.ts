import 'floating-vue/dist/style.css'
import tooltip from '@/config/tooltip'
import FloatingVue from 'floating-vue'

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(FloatingVue, tooltip)
})