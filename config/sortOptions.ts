import { SortOptions } from "types";

export const sortOptions: Array<SortOptions> = [
    {
        groupName: 'Сложность: ',
        options: [
            {
                label: 'Самые новые',
                value: 'recent'
            },
            {
                label: 'Сначала лёгкие',
                value: 'easier_first'
            },
            {
                label: 'Сначала сложные',
                value: 'hard_first'
            }
        ]
    }
]