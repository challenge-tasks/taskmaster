import { string, ref, object } from "yup"

export const validationRules = object().shape({
    email: string().email('Неправильный формат Email').required('Поле Email обязательно к заполнению'),

    password: string().min(6, 'Длина пароля должна быть больше 6 символов').required('Поле пароля обязательно к заполнению'),

    confirmPassword: string().oneOf([ref('password')], 'Пароли не совпадают').required('Поле повторного пароля обязательно к заполнению')
})