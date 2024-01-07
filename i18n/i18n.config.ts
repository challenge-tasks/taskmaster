export default defineI18nConfig(() => ({
    locale: 'ru',
    messages: {
        ru: {
            authorization: {
                incorrect_password: 'Пароль введен неверно',
                password_not_confirmed: 'Пароль не подтвержден',
                email_required: 'E-mail обязателен к заполнению',
                password_required: 'Пароль обязателен к заполнению',
                passwords_not_equal: 'Введенные пароли не совпадают',
                password_min_eight: 'Минимальная длина пароля 8 символов',
                username_required: 'Имя пользователя обязательно к заполнению',
                passwords_length: 'Длина пароля должна быть не меньше 8 символов',
                password_max_one_hundred: 'Максимальная длина пароля 100 символов',
                email_not_exists: 'Пользователь с такой электронной почтой не найден',
                server_error: 'Ошибка на стороне сервера, пожалуйста попробуйте позже',
                email_exists: 'Пользователь с такой электронной почтой уже существует',
                username_exists: 'Пользователь с таким именем пользователя уже существует',
                validation_error: 'Ошибка валидации данных, проверьте правильность введенных данных',
            },

            task: {
                status: {
                    done: 'Завершено',
                    todo: 'Надо сделать',
                    reviewing: 'Проверяется',
                    null: 'Выполнить задание',
                    in_development: 'Выполняется'
                }
            },

            reports: {
                too_many_requests: 'Слишком много запросов',
                too_many_requests_desc: 'Слишком много попыток на отправку сообщения, пожалуйста попробуйте позже'
            },

            upload: {
                file_required: 'Загрузите файл для проверки',
                file_must_be_rar_or_zip: 'Файл должен быть в одном из следующих форматов: .zip или .rar'
            },

            too_many_requests: 'Слишком много запросов, попробуйте через { retry_after } секунд',
            server_error: 'Ошибка на стороне сервера, попробуйте позже',
            forbidden: 'У вас нет прав на выполнение этих действий',
            not_found: 'Запрашиваемый ресурс не найден'
        }
    }
}))
