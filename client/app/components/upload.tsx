import { IKContext, IKUpload } from "imagekitio-react"
import { useRef, type Dispatch, type SetStateAction, type SyntheticEvent } from "react"
// import { toast } from "react-toastify"

interface AuthResponse {
  signature: string
  expire: number
  token: string
}

<<<<<<< HEAD
interface UploadProps {
  children?: React.ReactNode
  type: string
  setProgress: Dispatch<SetStateAction<number>>
  setData: React.Dispatch<React.SetStateAction<ImageKitUploadResponse | string>>
}

interface ImageKitUploadResponse {
  fileId: string
  name: string
  url: string
  thumbnailUrl: string
  height: number
  width: number
  size: number
  fileType: string
  filePath: string
=======
interface UploadProps<T> {
  children?: React.ReactNode
  type: string
  setProgress: Dispatch<SetStateAction<number>>
  setData: React.Dispatch<React.SetStateAction<T>>
}

interface UploadResponse {
  fileId: string
  name: string
  url: string
  thumbnailUrl?: string
  fileType: string
>>>>>>> 5cf5dc53a0fa630be940045c69cb76e86f347bed
}

const authenticator = async(): Promise<AuthResponse> => {
  try {    

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const { signature, expire, token } = data

    return { signature, expire, token }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`)
    }
    throw new Error(`Authentication request failed: Unknown error`)
  }
}

export default function Upload({ children, type, setProgress, setData }: UploadProps) {  

  const ref = useRef<HTMLInputElement | null>(null)

<<<<<<< HEAD
  const onError = (err: Error | SyntheticEvent<HTMLDivElement>) => {
    console.log(err)
    // toast.error("Image upload failed!")
  }

  const onSuccess = (res: ImageKitUploadResponse) => {
=======
  const onError = (err: Error | React.SyntheticEvent<HTMLInputElement>) => {
    if (err instanceof Error) {
      console.error("Upload error:", err)
      toast.error("Image upload failed!")
    } else {
      console.error("Input event error:", err)
      toast.error("An error occurred with the file input.")
    }
  }

  const onSuccess = (res: UploadResponse) => {
>>>>>>> 5cf5dc53a0fa630be940045c69cb76e86f347bed
    console.log(res)
    setData(res as T)
  }

  const onUploadProgress = (progress: ProgressEvent) => {
    console.log(progress)
    setProgress(Math.round(progress.loaded / progress.total) * 100)
  }

  return (
    <IKContext
          publicKey={import.meta.env.VITE_IMGKIT_PUBLIC_KEY}
          urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT}
          authenticator={authenticator}
    >
      <IKUpload 
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="cursor-pointer" onClick={() => ref.current?.click()}>
        {children}
      </div>
    </IKContext>
  )
}