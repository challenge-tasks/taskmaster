import * as yup from "yup"

export const validationRules = {
    email: {
        required: yup.string().required('Поле Email обязательно к заполнению'),
        email: yup.string().email('Неправильный формат Email')
    },

    password: {
        required: yup.string().required('Поле пароля обязательно к заполнению'),
        minLength: yup.string().min(6, 'Длина пароля должна быть больше 6 символов')
    },

    confirmPassword: {
        required: yup.string().required('Поле повторного пароля обязательно к заполнению'),
        sameAs: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают')
    }
}