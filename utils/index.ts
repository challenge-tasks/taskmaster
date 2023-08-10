export function eraseFilledData(data: Record<string, any>): void {
    if (data.value) {
        data.value = ''
    } else {
        for (const key in data) {
            data[key] = ''
        }
    }
}