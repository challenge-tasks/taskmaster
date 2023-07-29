export interface SortOptions {
    groupName?: string,
    options: Array<SortOption>
}

export interface SortOption {
    label: string
    value: string
}

export interface FilterOption {
    label: string
    value: string
}

export interface FilterOptions {
    radioGroupName: string,
    groupName?: string,
    options: Array<FilterOption>
}