import { string, ref, object } from "yup"

export const validationRules = object().shape({
    email: string().email('Неправильный формат Email').required('Поле Email обязательно к заполнению'),

    password: string().min(6, 'Длина пароля должна быть больше 6 символов').required('Поле пароля обязательно к заполнению'),

    username: string().min(5, 'Длина имени пользователя должно быть больше 5 символов').required('Имя пользователя обязательно')
})