import type { AsyncDataRequestStatus } from "nuxt/dist/app/composables/asyncData"

export type TasksListType = Array<TaskType> | undefined

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

export interface SimplifiedResponseType<DataT = {}, ErrorT = {}> {
    data: DataT
    pending: boolean
    error: ErrorT | null
    status: AsyncDataRequestStatus
}

export interface TaskType {
    id: number
    slug: string
    name: string
    image: string
    summary: string
    description?: string
    difficulty: string
    status?: string
    rating?: number
    comment?: string | null
    images?: Array<string>
    stacks: Array<TechStackType>
    tags: Array<TagType>
    created_at: number
    updated_at: number
}

export interface ITasksList {
    data: Array<TaskType>
    links: object
    meta: object
}

export interface TaskDetailsResponse {
    data: TaskType
}

export interface TagType {
    id: number
    slug: string
    name: string
}

export interface TechStackType {
    id: number
    slug: string
    name: string
}