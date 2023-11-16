import { FilterOptions } from "types";

export const sortOptions: Array<FilterOptions> = [
    {
        radioGroupName: 'diffculty',
        groupName: '',
        options: [
            {
                label: 'Сначала легкие',
                value: 'difficulty'
            },
            {
                label: 'Сначала сложные',
                value: '-difficulty'
            },
            {
                label: 'Сначала новые',
                value: '-created_at'
            },
            {
                label: 'Сначала старые',
                value: 'created_at'
            }
        ]
    }
]