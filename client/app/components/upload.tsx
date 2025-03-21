import { IKContext, IKUpload } from "imagekitio-react"
import { useRef, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { toast } from "react-toastify"

interface AuthResponse {
  signature: string;
  expire: number;
  token: string;
}

interface UploadProps<T> {
  children?: ReactNode;
  type: string;
  setProgress: Dispatch<SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<T>>;
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
    // Type the error as unknown first, then narrow it down
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`)
    }
    // Handle cases where error might not be an Error instance
    throw new Error(`Authentication request failed: Unknown error`)
  }
}

export default function Upload<T,>({ children, type, setProgress, setData }: UploadProps<T>) {  

  const ref = useRef<HTMLInputElement | null>(null)

  const onError = (err: Error) => {
    console.log(err)
    toast.error("Image upload failed!")
  }

  const onSuccess = (res: T) => {
    console.log(res)
    setData(res)
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