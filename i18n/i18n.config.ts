export default defineI18nConfig(() => ({
    locale: 'ru',
    messages: {
        ru: {
            authorization: {
                passwords_not_equal: 'Введенные пароли не совпадают',
                passwords_length: 'Длина пароля должна быть не меньше 8 символов',
                password_not_confirmed: 'Пароль не подтвержден',
                server_error: 'Ошибка на стороне сервера, пожалуйста попробуйте позже',
                validation_error: 'Ошибка валидации данных, проверьте правильность введенных данных',
                incorrect_password: 'Пароль введен неверно',
                email_required: 'E-mail обязателен к заполнению',
                email_exists: 'Пользователь с такой электронной почтой уже существует',
                email_not_exists: 'Пользователь с такой электронной почтой не найден',
                password_required: 'Пароль обязателен к заполнению',
                password_min_eight: 'Минимальная длина пароля 8 символов',
                password_max_one_hundred: 'Максимальная длина пароля 100 символов',
                username_required: 'Имя пользователя обязательно к заполнению',
                username_exists: 'Пользователь с таким именем пользователя уже существует',
            },

            task: {
               status: {
                null: 'Выполнить задание',
                todo: 'Надо сделать',
                in_development: 'Выполняется',
                reviewing: 'Проверяется',
                done: 'Завершено'
               } 
            },

            upload: {
                file_required: 'Загрузите файл для проверки',
                file_must_be_rar_or_zip: 'Файл проверки должен быть одного из следующих типов: .zip или .rar'
            },

            server_error: 'Ошибка на стороне сервера, попробуйте позже',
            forbidden: 'У вас нет прав на выполнение этих действий',
            not_found: 'Запрашиваемый ресурс не найден'
        }
    }
}))
