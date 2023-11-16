import { IFilterOptions } from "types";

export const sortOptions: Array<IFilterOptions> = [
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