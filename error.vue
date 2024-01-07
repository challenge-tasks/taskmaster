<template>
    <NuxtLayout name="404">
        <div class="h-full flex flex-col gap-4 justify-center items-center">
            <img :src="NotFoundIllustration" class="max-w-lg max-h-80" alt="">
            <p class="sm:text-lg text-center text-slate-500">Запрашиваемая вами страница не найдена</p>
            <UButton to="/" size="xl" class="px-5" label="Вернуться на главную" />
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import NotFoundIllustration from '@/assets/images/7.svg'
</script>