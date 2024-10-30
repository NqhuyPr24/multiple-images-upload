import { ChangeEvent, useState } from "react"
import { base64Converter } from "../utils/base64Converter"
import PreviewUploadItems from "./PreviewUploadItems"
import { FaPlus } from "react-icons/fa6"

type MultipleUploadImagesProps = {
    /**
     * Base64 Images.
     */
    value?: string[]
    onChange?: (value: string[]) => void
    limit?: number
}

const MultipleUploadImages = ({
    value,
    onChange,
    limit
}: MultipleUploadImagesProps) => {

    const [images, setImages] = useState<string[]>(value ?? [])

    const updateImages = (updatedImages: string[]) => {
        setImages(updatedImages)
        onChange?.(updatedImages)
    }

    const handleAddImages = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : []
        const newImages = await Promise.all(files.map(file => base64Converter(file)))
        const updatedImages = [...images, ...newImages.filter(Boolean) as string[]]

        if (limit && updatedImages.length > limit) {
            updatedImages.splice(limit)
        }

        updateImages(updatedImages)
    }

    const handleRemoveImage = (img: string) => {
        const updatedImages = images.filter(image => image !== img)

        updateImages(updatedImages)
    }

    const handleEditImage = (index: number, img: string) => {
        const updatedImages = [...images]
        updatedImages[index] = img

        updateImages(updatedImages)
    }

    return (
        <>
            <h3 className="mb-5 text-2xl font-medium">Upload images</h3>
            <div className="flex flex-wrap gap-4 items-center">
                {images.map((img, index) => 
                    <PreviewUploadItems
                        key={img}
                        src={img}
                        onEdit={e => handleEditImage(index, e)}
                        onDelete={() => handleRemoveImage(img)}
                    />
                )}
                <div>
                    <input
                        type="file"
                        id="multiple-upload-images-input-82j2yw9"
                        className="hidden"
                        multiple
                        onChange={handleAddImages}
                        accept="image/*"
                    />
                    <label
                        htmlFor="multiple-upload-images-input-82j2yw9"
                        className="cursor-pointer flex items-center justify-center size-10 mx-3 text-2xl text-sky-500 border-2 rounded-full border-sky-500"
                    >
                        {/* Upload button */}
                        <FaPlus/>
                    </label>
                </div>
            </div>
        </>
    )
}

export default MultipleUploadImages