<template>
    <client-only>
        <div class="flex gap-2 items-center">
            <div v-for="rating in ratings" :key="rating.value" class="rating flex gap-3 flex-col items-center">
                <div class="rating__img">
                    <img srс="/1.png" alt="" />
                </div>
                <span class="font-medium">{{ rating.value }}</span>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">

const ratings = ref([
    {
        value: 0,
        image: '/0.png'
    },
    {
        value: 1,
        image: '/1.png'
    },
    {
        value: 2,
        image: '/2.png'
    },
    {
        value: 3,
        image: '/3.png'
    },
    {
        value: 4,
        image: '/4.png'
    },
    {
        value: 5,
        image: '/5.png'
    }
])

</script>