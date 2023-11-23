export function eraseFilledData(data: Record<string, any>): void {
    if (data.value) {
        data.value = ''
    } else {
        for (const key in data) {
            data[key] = ''
        }
    }
}

export function getDifficultyLevel(difficulty: string) {
    const difficultyEnum: Record<string, number> = {
        'Intern': 0,
        'Junior': 1,
        'Middle': 2,
        'Senior': 3,
        'Guru': 4
    }

    return difficultyEnum[difficulty]
}

export function trimText(summary: string, maxLength: number) {
    if (summary.length <= maxLength) {
        return summary
    } else {
        return summary.slice(0, maxLength).trim() + '...'
    }
}

export function generateGithubAuthUrl(from: any) {

    const config = useRuntimeConfig()

    const rootUrl = 'https://github.com/login/oauth/authorize'

    const options = {
        state: from,
        scope: 'user,user:email',
        client_id: config.public.github_client_id,
        redirect_uri: config.public.github_oauth_redirect_url
    }

    const queryString = new URLSearchParams(options)

    return `${rootUrl}?${queryString.toString()}`
}

export function badgeClassesBasedOnDifficultyLevel(difficulty: string) {
    const diffLevel = getDifficultyLevel(difficulty)

    switch (diffLevel) {
        case 0:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-green-50 text-green-500 ring-1 ring-inset ring-green-500 ring-opacity-25'
        case 1:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-cyan-50 text-cyan-500 ring-1 ring-inset ring-cyan-500 ring-opacity-25'
        case 2:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-amber-50 text-amber-500 ring-1 ring-inset ring-amber-500 ring-opacity-25'
        case 3:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-red-50 text-red-500 ring-1 ring-inset ring-red-500 ring-opacity-25'
        case 4:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 bg-indigo-50 text-indigo-500 ring-1 ring-inset ring-indigo-500 ring-opacity-25'
        default:
            return 'inline-flex items-center font-medium rounded-full text-xs px-2 py-1 ring-1 ring-inset ring-gray-300 text-gray-700 bg-gray-50'
    }
}

export function getCookieExpirationDate(days: number): Date {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)

    return date
}