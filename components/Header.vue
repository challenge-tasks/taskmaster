<template>
    <header class="header">
        <div class="header__inner">

            <NuxtLink to="/">
                <img src="../assets/icons/logo.svg" alt="Logotype">
            </NuxtLink>

            <span @click="toggleMenu" class="burger" :class="{ 'burger--active': isMenuActive }">
                <span class="burger__sausage"></span>
                <span class="burger__sausage"></span>
                <span class="burger__sausage"></span>
            </span>

            <div class="menu" :class="{ 'menu--active': isMenuActive }">
                <NuxtLink to="/tasks" class="menu__item">Задания</NuxtLink>
                <NuxtLink to="/about" class="menu__item">О проекте</NuxtLink>
                <Button @click="toggleSignInModal" v-bind="signInModalToggleButtonConfig" />
                <Socials />
            </div>

        </div>
    </header>
</template>

<script setup lang="ts">

const isMenuActive = ref(false)

const signInModalToggleButtonConfig = {
    label: "Войти", 
    class: "btn--primary btn--rounded menu__btn",
    icon: { name: 'octicon:person-24', class: 'btn__icon--right' }
}

function toggleMenu() {
    isMenuActive.value = !isMenuActive.value

    useHead({
        bodyAttrs: {
            class: isMenuActive.value ? 'overflow-hidden' : ''
        }
    })
}

const { toggleSignInModal } = useAuthentication()

</script>