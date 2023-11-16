import { FetchOptions } from 'ofetch'

export interface ISortOptions {
    groupName?: string,
    options: Array<IFilterOption>
}

export interface IFilterOption {
    label: string
    value: string
}

export interface IFilterOptions {
    radioGroupName: string,
    groupName?: string,
    options: Array<IFilterOption>
}

export interface IAuthPayload {
    username?: string
    email: string
    password: string
}

export interface IUser {
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
        user: IUser
    }
}

export interface IAuthError {
    data: {
        type: string
        message: string
    }
}

export interface ITaskType {
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
    stacks: Array<ITechStackType>
    tags: Array<ITagType>
    created_at: number
    updated_at: number
}

export interface ITasksResponse {
    data: ITaskType[]
    links: object
    meta: object
}

export interface ITaskDetail {
    data: ITaskType
}

export interface ITagType {
    id: number
    slug: string
    name: string
}

export interface ITechStackType {
    id: number
    slug: string
    name: string
}

export interface IFetchOptions {
    customParams?: {
        [key: string]: any
    }
    fetcherOptions?: FetchOptions<'json'>
}