import { useEffect, useState } from "react"
import { FaPen } from "react-icons/fa"
import ImageCropper from "./ImageCropper"
import { FaXmark } from "react-icons/fa6"

type PreviewUploadItemsProps = {
    onEdit?: (editedImage: string) => void
    onDelete?: () => void
    src?: string
}

const PreviewUploadItems = ({src, onEdit, onDelete}: PreviewUploadItemsProps) => {

    const [open, setOpen] = useState(false)
    const [preview, setPreview] = useState<any>(src)

    useEffect(() => {
        setPreview(src)
    }, [src])

    const handleEdit = (img: any) => {
        setPreview(img)
        onEdit?.(img)
    }

    return (
        <div className="relative rounded-lg border size-20">
            <img
                src={preview}
                alt=""
                className="absolute size-full rounded-lg object-cover"
            />
            <button
                onClick={() => setOpen(true)}
                className="flex
                    absolute
                    z-10
                    justify-center
                    items-center
                    size-full
                    rounded-lg
                    text-white
                    bg-gray-400/15
                    transition-all
                    opacity-0
                    hover:opacity-100"
            >
                <FaPen/>
            </button>
            <button
                className="absolute
                    flex
                    justify-center
                    items-center
                    text-sm
                    z-20
                    bg-red-500
                    top-0
                    right-0
                    translate-x-1/2
                    -translate-y-1/2
                    size-5
                    text-white
                    rounded-full"
                onClick={onDelete}>
                <FaXmark />
            </button>
            <ImageCropper
                open={open}
                onClose={() => setOpen(false)}
                src={preview}
                onCrop={handleEdit}
            />
        </div>
    )
}

export default PreviewUploadItems