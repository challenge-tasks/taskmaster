interface RatingInterface {
    value: number
    image: string
}

const ratings: Array<RatingInterface> = [
    {
        value: 0,
        image: '@/assets/images/0.webp'
    },
    {
        value: 1,
        image: '@/assets/images/1.webp'
    },
    {
        value: 2,
        image: '@/assets/images/2.webp'
    },
    {
        value: 3,
        image: '@/assets/images/3.webp'
    },
    {
        value: 4,
        image: '@/assets/images/4.webp'
    },
    {
        value: 5,
        image: '@/assets/images/5.webp'
    }
]

export { ratings }