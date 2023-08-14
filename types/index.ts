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

export interface AuthPayload {
    username?: string
    email: string
    password: string
}

export interface User {
    avatar: string
    created_at: number
    email: string
    id: number
    updated_at: number
    username: string
}

export interface AuthResponse {
    data: {
        token: string
        user: User
    }
}