<template>
    <header class="header">
        <div class="header__inner">

            <NuxtLink to="/">
                <img src="../assets/icons/logo.svg" alt="Logotype">
            </NuxtLink>

            <span class="burger">
                <span class="burger-sausage"></span>
                <span class="burger-sausage"></span>
                <span class="burger-sausage"></span>
            </span>

            <div class="menu">
                <NuxtLink to="/" class="menu__item">Задания</NuxtLink>
                <NuxtLink to="/about" class="menu__item">О проекте</NuxtLink>
                <Button @click="toggleSignInModal" label="Авторизация" class="btn--primary menu__btn" :icon="{ name: 'octicon:person-24', class: 'btn__icon--right' }" />
            </div>

        </div>
    </header>
</template>

<script setup lang="ts">

const { toggleSignInModal } = useAuthentication()

</script>