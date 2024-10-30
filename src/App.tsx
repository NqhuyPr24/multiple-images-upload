import { useState } from "react"
import MultipleUploadImages from "./components/MutilpleUploadImages"

function App() {

  const [imgPreviews, setImgPreviews] = useState<string[]>([])

  return (
    <div className="p-4">
      <MultipleUploadImages value={imgPreviews} onChange={setImgPreviews}/>
      {(imgPreviews.length > 0) && 
        <div className="mt-4">
          <h1 className="mb-4 text-2xl font-medium">Previews</h1>
          <div className="flex gap-4 flex-wrap">
            {imgPreviews.map(img => (
              <div key={img} className="rounded-lg border">
                <img
                  src={img}
                  alt=""
                  className="size-36 sm:size-60 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default App
