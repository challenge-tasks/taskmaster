import { FilterOptions } from "types";

export const filterOptions: Array<FilterOptions> = [
    {
        radioGroupName: 'diffculty',
        groupName: 'Уровень: ',
        options: [
            {
                label: 'Все',
                value: 'all'
            },
            {
                label: 'Новичок',
                value: 'newbie'
            },
            {
                label: 'Junior',
                value: 'junior'
            },
            {
                label: 'Middle',
                value: 'middle'
            },
            {
                label: 'Senior',
                value: 'senior'
            }
        ]
    }
]