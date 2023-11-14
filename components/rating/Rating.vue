<template>
    <client-only>
    <div class="flex items-center">
        <div v-for="rating in ratings" :key="rating.value" class="rating">
            <div class="rating__img" style="width: 100px; height: 100px; background-image: url(images['/assets/images/0.png'].default);">
                <img :srс="images['/assets/images/0.png'].default" width="100" height="100" />
            </div>
            <span class="font-medium">{{ rating.value }}</span>
        </div>
    </div>
    </client-only>
</template>

<script setup lang="ts">
import zeroRating from '@/assets/images/0.png'

const images = import.meta.globEager("@/assets/images/*.png");

const ratings = ref([
    {
        value: 0,
        image: '@/assets/images/1.png'
    },
    {
        value: 1,
        image: '@/assets/images/1.png'
    },
    {
        value: 2,
        image: '@/assets/images/1.png'
    },
    {
        value: 3,
        image: '@/assets/images/1.png'
    },
    {
        value: 4,
        image: '@/assets/images/1.png'
    },
    {
        value: 5,
        image: '@/assets/images/1.png'
    }
])

</script>