import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';

const rules = computed(() => {
    return {
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirmPassword: { required, sameAs: sameAs(formData.password) },
    };
});