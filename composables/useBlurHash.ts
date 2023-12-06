import { encode } from 'blurhash'

export function useBlurHash() {

    const loadImage = async (src: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = (...args) => reject(args)
            img.src = src
            img.setAttribute('crossOrigin', 'anonymous')
        })

    const getImageData = (image: HTMLImageElement): ImageData => {
        const canvas: HTMLCanvasElement = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context: CanvasRenderingContext2D = canvas.getContext('2d')!
        context.drawImage(image, 0, 0)
        return context.getImageData(0, 0, image.width, image.height)
    }

    const encodeImage = async (url: string) => {
        const image: HTMLImageElement = await loadImage(url)
        const imageData: ImageData = getImageData(image)
        return encode(imageData.data, imageData.width, imageData.height, 4, 4)
    }

    return {
        loadImage,
        encodeImage,
        getImageData
    }
}