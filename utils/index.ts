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