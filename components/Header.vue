<template>
    <header class="header">
        <div class="header__inner">
            
            <div class="logo flex justify-center items-center">
                <span class="text-white font-medium">Logo</span>
            </div>
            
            <div class="menu">
                <NuxtLink to="/" class="menu__item">Таски</NuxtLink>
                <NuxtLink to="/" class="menu__item">О проекте</NuxtLink>
                <Button label="Войти" class="btn--primary" :icon="{ name: 'octicon:sign-in-16', class: 'btn__icon--right' }"  />
            </div>

        </div>
    </header>
</template>

<script>
export default {

}
</script>