interface RatingInterface {
    value: number
    image: string
}

const ratings: Array<RatingInterface> = [
    {
        value: 0,
        image: '@/assets/images/0.png'
    },
    {
        value: 1,
        image: '@/assets/images/1.png'
    },
    {
        value: 2,
        image: '@/assets/images/2.png'
    },
    {
        value: 3,
        image: '@/assets/images/3.png'
    },
    {
        value: 4,
        image: '@/assets/images/4.png'
    },
    {
        value: 5,
        image: '@/assets/images/5.png'
    }
]

export { ratings }