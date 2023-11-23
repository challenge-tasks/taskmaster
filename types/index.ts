import { FetchOptions } from 'ofetch'

export interface ISortOptions {
    groupName?: string
    options: Array<IFilterOption>
}

export interface IFilterOption {
    label: string
    value: string
}

export interface IFilterOptions {
    radioGroupName: string
    groupName?: string
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
    github_url: string
    is_email_verified: boolean
    updated_at: number
    username: string
}

export interface IAuthResponse {
    data: {
        token: string
        user: IUser
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

export interface ITaskReview {
    comment: string
    rating: number
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

export interface IStartTaskSuccessResponse {
    data: {
        status: string
    }
}

export interface ITaskSolutionUploadSuccess {
    success: boolean
}

export interface IGithubUserData {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    name: string
    company: string
    blog: string
    location: string
    email: string
    hireable: boolean
    bio: string
    twitter_username: string
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
    private_gists: number
    total_private_repos: number
    owned_private_repos: number
    disk_usage: number
    collaborators: number
    two_factor_authentication: boolean
    plan: {
        name: string
        space: number
        collaborators: number
        private_repos: number
    }
}

export interface ISimpleSuccessResponse {
    success: boolean
}

export interface IPasswordRecoveryBody {
    email: string
    token: string
    password: string
}

export interface IBaseErrorResponse {
    data: {
        type: string
        message: string
    }
}