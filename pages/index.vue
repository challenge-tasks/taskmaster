<template>
    <section class="my-10">
        <div class="mx-auto tm-container">
            <div class="intro">

                <div class="intro__info">
                    <h1 class="mb-3 intro__title">На пути к <span class="text-indigo-600">совершенствованию</span> навыков</h1>
                    <p class="mb-4 intro__text text-slate-500">
                        Платформа, где ваши навыки обретают новое измерение. Независимо от
                        вашего уровня опыта, здесь вы найдете задачи на меру вашим амбициям.
                        <br />
                        Прокачайте свои скиллы, решая задачи разной сложности, и идите к своим целям в мире разработки!
                    </p>
                    <Button @click="toggleSignUpModal" label="Зарегистрироваться" class="py-3 btn--rounded btn--primary"
                        :icon="{ name: 'octicon:person-add-24', class: 'btn__icon--right' }" />
                </div>

                <div class="intro__img">
                    <img src="~/assets/images/trophy-dynamic-premium.png" />
                </div>

            </div>
        </div>
    </section>

    <section class="section">
        <div class="mx-auto tm-container">
            <div class="tasks relative">
                <NuxtLink :to="'/task/' + card.id" v-for="card in cards" class="tasks__item">
                    <TaskCard :data="card" />
                </NuxtLink>
                <div class="spoiler-block"></div>
            </div>

            <div class="mt-5 flex justify-center">
                <NuxtLink to="/tasks" class="d-block bg-green-300 py-3 btn btn--primary btn--rounded menu__btn">
                    <span class="btn__label">Посмотреть все задания</span>
                    <Icon name="octicon:tasklist-24" class="btn__icon btn__icon--right" />
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
        description: "A simple to-do list application where users can add, complete, and remove tasks. It should have a clean and intuitive user interface.",
        stacks: ["HTML", "CSS", "JavaScript"],
        difficulty: "Junior",
        image: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_475/Challenges/hg4pjudclbtzgb8xmsy9.jpg",
    },
    {
        id: 2,
        name: "Weather App",
        description: "A weather application that fetches and displays current weather data based on the user's location or search. Users should be able to view weather details for different locations.",
        stacks: ["React", "API"],
        difficulty: "Middle",
        image: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_475/Challenges/zimchyd6aujs5y4h5wxd.jpg",
    },
    {
        id: 3,
        name: "E-commerce Website",
        description: "An online store with product listings, shopping cart, and checkout functionality. Users should be able to search, filter, and purchase products securely.",
        stacks: ["Node.js", "Express", "MongoDB"],
        difficulty: "Senior",
        image: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_475/Challenges/jeqwwcwhyfli19ollyjj.jpg",
    },
    {
        id: 4,
        name: "Blog Platform",
        description: "A blogging platform with user authentication where users can create, edit, and delete their posts. It should support rich text formatting and have comment functionality.",
        stacks: ["Vue.js", "Firebase"],
        difficulty: "Middle",
        image: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_475/Challenges/mwjogovjjnkz6f6yzdkp.jpg",
    },
    {
        id: 5,
        name: "Social Media App",
        description: "A social media application with user profiles, posts, and social interactions. Users should be able to follow others, like and comment on posts.",
        stacks: ["Ruby on Rails", "PostgreSQL"],
        difficulty: "Junior",
        image: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_475/Challenges/idpgv9arkmvkojb2kxee.jpg",
    },
    {
        id: 6,
        name: "E-learning Platform",
        description: "An online platform for e-learning courses with user registration, course enrollment, and progress tracking. It should have a dashboard for both students and instructors.",
        stacks: ["Django", "MySQL"],
        difficulty: "Senior",
        image: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_475/Challenges/b03akozsxsouireonkkd.jpg",
    },
    {
        id: 7,
        name: "Portfolio Website",
        description: "A personal portfolio website showcasing projects, skills, and contact information. It should have sections for projects with descriptions and links.",
        stacks: ["Angular", "Firebase"],
        difficulty: "Middle",
        image: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_475/Challenges/pctb0lbjgupas4lccsjd.jpg",
    },
    {
        id: 8,
        name: "Recipe App",
        description: "An app for sharing and searching recipes. Users can create, share, and rate recipes. It should have a search feature and user authentication.",
        stacks: ["PHP", "Laravel", "MySQL"],
        difficulty: "Junior",
        image: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_475/Challenges/lpwvfibpdyycvjpukkec.jpg",
    }
])

const { toggleSignUpModal } = useAuthentication()
</script>