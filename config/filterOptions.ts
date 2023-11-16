import { ISortOptions } from "types";

export const filterOptions: Array<ISortOptions> = [
    {
        groupName: 'По сложности: ',
        options: [
            {
                label: 'Intern',
                value: 1
            },
            {
                label: 'Junior',
                value: 2
            },
            {
                label: 'Middle',
                value: 3
            },
            {
                label: 'Senior',
                value: 4
            },
            {
                label: 'Guru',
                value: 5
            }
        ]
    }
]