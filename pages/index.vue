<template>
    <section class="section">
        <div class="mx-auto tm-container">
            <h2 class="section__title">Таски</h2>
            <p class="section__subtitle">Выполняйте таски и получайте вознаграждение</p>

            <div class="tasks">

                <NuxtLink to="https://t.me/aslbekkucharov" :data-card-id="card.id" v-for="card in cards" class="task-card">

                    <span class="task-card__img">
                        <img :src="card.image" :alt="card.description">
                    </span>

                    <span class="task-card__middle">

                        <div class="mb-2 flex items-center justify-between gap-5">
                            <h4 class="task-card__title">{{ card.name }}</h4>
                            <span class="task-card__difficulty" :data-difficulty="getDifficulty(card.difficulty)">{{
                                card.difficulty }}</span>
                        </div>

                        <p class="task-card__excerpt">{{ card.description }}</p>
                    </span>

                    <span v-if="card.stacks" class="task-card__bottom">
                        <span class="task-card__tags">
                            <span v-for="stack in card.stacks" class="task-card__tag" :data-lang="getStack(stack)">{{ stack
                            }}</span>
                        </span>
                    </span>

                </NuxtLink>

            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const cards = reactive([
    {
        id: 1,
        name: "To-Do App",
        description: "A simple to-do list application where users can add, complete, and remove tasks. It should have a clean and intuitive user interface. (Junior) #webdev #HTML #CSS #JavaScript",
        stacks: ["HTML", "CSS", "JavaScript"],
        difficulty: "Junior",
        image: "https://rb.gy/bggi3",
    },
    {
        id: 2,
        name: "Weather App",
        description: "A weather application that fetches and displays current weather data based on the user's location or search. Users should be able to view weather details for different locations. (Middle) #webdev #React #API",
        stacks: ["React", "API"],
        difficulty: "Middle",
        image: "https://shorturl.at/eluFV",
    },
    {
        id: 3,
        name: "E-commerce Website",
        description: "An online store with product listings, shopping cart, and checkout functionality. Users should be able to search, filter, and purchase products securely. (Senior) #webdev #Node.js #Express #MongoDB",
        stacks: ["Node.js", "Express", "MongoDB"],
        difficulty: "Senior",
        image: "https://shorturl.at/klLM8",
    },
    {
        id: 4,
        name: "Blog Platform",
        description: "A blogging platform with user authentication where users can create, edit, and delete their posts. It should support rich text formatting and have comment functionality. (Middle) #webdev #Vue.js #Firebase",
        stacks: ["Vue.js", "Firebase"],
        difficulty: "Middle",
        image: "https://shorturl.at/flvI5",
    },
    {
        id: 5,
        name: "Social Media App",
        description: "A social media application with user profiles, posts, and social interactions. Users should be able to follow others, like and comment on posts. (Junior) #webdev #RubyonRails #PostgreSQL",
        stacks: ["Ruby on Rails", "PostgreSQL"],
        difficulty: "Junior",
        image: "https://shorturl.at/goCIZ",
    },
    {
        id: 6,
        name: "E-learning Platform",
        description: "An online platform for e-learning courses with user registration, course enrollment, and progress tracking. It should have a dashboard for both students and instructors. (Senior) #webdev #Django #MySQL",
        stacks: ["Django", "MySQL"],
        difficulty: "Senior",
        image: "https://t.ly/t1fPr",
    },
    {
        id: 7,
        name: "Portfolio Website",
        description: "A personal portfolio website showcasing projects, skills, and contact information. It should have sections for projects with descriptions and links. (Middle) #webdev #Angular #Firebase",
        stacks: ["Angular", "Firebase"],
        difficulty: "Middle",
        image: "https://t.ly/2ptIM",
    },
    {
        id: 8,
        name: "Recipe App",
        description: "An app for sharing and searching recipes. Users can create, share, and rate recipes. It should have a search feature and user authentication. (Junior) #webdev #PHP #Laravel #MySQL",
        stacks: ["PHP", "Laravel", "MySQL"],
        difficulty: "Junior",
        image: "https://t.ly/jIMC5",
    },
    {
        id: 9,
        name: "Music Streaming Service",
        description: "A music streaming platform with user playlists, song recommendations, and user interactions. It should have a music player and support for different genres. (Middle) #webdev #Java #SpringBoot #MongoDB",
        stacks: ["Java", "Spring Boot", "MongoDB"],
        difficulty: "Middle",
        image: "https://t.ly/Pt-Lq",
    },
    {
        id: 10,
        name: "Task Manager",
        description: "A task management application with priority levels and deadlines. Users can create, assign, and track tasks. It should have user authentication and notifications. (Senior) #webdev #Python #Flask #SQLite",
        stacks: ["Python", "Flask", "SQLite"],
        difficulty: "Senior",
        image: "https://t.ly/G8MNZ",
    }])

function getStack(stack: string) {
    return stack.toLowerCase()
}

function getDifficulty(difficulty: string) {
    const difficultyEnum: Record<string, number> = {
        'Junior': 1,
        'Middle': 2,
        'Senior': 3
    }

    return difficultyEnum[difficulty]
}
</script>