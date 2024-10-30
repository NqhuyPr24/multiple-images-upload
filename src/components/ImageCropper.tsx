import { Modal, Slider } from "antd"
import { useCallback, useEffect, useState } from "react"
import Cropper, { Area } from "react-easy-crop"
import getCroppedImg from "../utils/cropImage"

type ImageCropperProps = {
    open?: boolean
    src?: string
    onClose?: () => void
    onCrop?: (srcCropped: any) => void
}

export default function ImageCropper({open, src, onClose, onCrop}: ImageCropperProps) {

    const [loading, setLoading] = useState(false)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setRotation(0)
    }, [src])

    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const onCropComplete = useCallback((_: Area, cap: Area) => {
        setCroppedAreaPixels(cap)
    }, [])

    const handleOK = () => {
        setLoading(true)
        getCroppedImg(src, croppedAreaPixels, rotation).then((result) => {
            onCrop?.(result)
            onClose?.()
        }).catch(e => {
            console.error(e)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Modal
            title="Chỉnh sửa hình ảnh"
            open={open}
            onOk={handleOK}
            onCancel={onClose}
            onClose={onClose}
            confirmLoading={loading}
            centered
            style={{
                transform: ''
            }}
        >
            {src && (
                <>
                    <div className="relative w-full h-80">
                        <Cropper
                            image={src}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1}
                            maxZoom={10}
                            zoomSpeed={2}
                            onRotationChange={setRotation}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className="mt-4">
                        <span>Thu phóng: </span>
                        <Slider
                            value={zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            onChange={setZoom}
                        />
                    </div>
                    <div className="mt-4">
                        <span>Quay: </span>
                        <Slider
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            onChange={setRotation}
                        />
                    </div>
                </>
            )}
        </Modal>
    )
}