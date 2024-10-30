import { base64Converter } from './base64Converter';
import { Area } from "react-easy-crop"

export const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url
})

const getRadianAngle = (degreeValue: number) => (degreeValue * Math.PI) / 180

export default async function getCroppedImg(imageSrc: string | null | undefined, pixelCrop: Area | null | undefined, rotation: number = 0) {
    if(!imageSrc || !pixelCrop) return
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const radianRotation = getRadianAngle(rotation)

    const { width, height } = image

    const canvasWidth = Math.abs(Math.cos(radianRotation)) * width + Math.abs(Math.sin(radianRotation)) * height
    const canvasHeight = Math.abs(Math.sin(radianRotation)) * width + Math.abs(Math.cos(radianRotation)) * height

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx?.translate(canvasWidth / 2, canvasHeight / 2)
    ctx?.rotate(radianRotation)
    ctx?.drawImage(image, -width / 2, -height / 2)

    const cropCanvas = document.createElement('canvas')
    const cropCtx = cropCanvas.getContext('2d')

    cropCanvas.width = pixelCrop.width
    cropCanvas.height = pixelCrop.height

    cropCtx?.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    return new Promise<string>((resolve) => {
        cropCanvas.toBlob((blob) => {
            if (!blob) {
                console.error('Canvas is empty')
                return
            }
            // const croppedImageUrl = URL.createObjectURL(blob)
            // resolve(croppedImageUrl)
            base64Converter(blob).then(result => resolve(result as string))
        }, 'image/jpeg')
    })
}
