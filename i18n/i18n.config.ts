export default defineI18nConfig(() => ({
    locale: 'ru',
    messages: {
        ru: {
            authorization: {
                validation_error: 'Ошибка валидации данных, проверьте правильность введенных данных.',
            },

            server_error: 'Ошибка на стороне сервера, попробуйте позже.',
            forbidden: 'У вас нет прав на выполнение этих действий.',
            not_found: 'Запрашиваемый ресурс не найден.'
        }
    }
}))
