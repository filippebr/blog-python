import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import React, { Suspense, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import Upload from "~/components/upload"
// import ReactQuill from "react-quill-new"
// import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = React.lazy(() => import('react-quill-new'))

type PostData = {
  img: FormDataEntryValue | null
  title: FormDataEntryValue | null
  category: FormDataEntryValue | null
  desc: FormDataEntryValue | null
  content: string
}

interface Image {
  url: string
}

interface Video {
  url: string
}

interface CoverImage {
  filePath: string;
}

export default function Write() {

  const { isLoaded, isSignedIn } = useUser()
  const [value, setValue] = useState('')
  const [cover, setCover] = useState<CoverImage | string>('')
  const [img, setImg] = useState<string | Image>('')
  const [video, setVideo] = useState<string | Video>('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Type guard to check if img is an Image object
    if (img) {
      setValue(prev => prev + `<p><image src="${(img as Image).url}" /></p>`);
    }
  }, [img])

  useEffect(() => {
    if (video) {
      setValue(prev => prev + `<p><iframe class="ql-video" src="${(video as Video).url}" /></p>`);
    }
  }, [video])

  const navigate = useNavigate()

  const { getToken } = useAuth()  

  const mutation = useMutation({
    mutationFn: async (newPost: PostData) => {
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess:(res) => {
      // console.log("Response:", res.data)
      // console.log("Slug:", res.data.slug)
      toast.success("Post has been created")
      navigate(`/posts/${res.data.slug}`)
    },
  })

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className="">You should login!</div>;
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data = {
      img: cover && typeof cover !== 'string' ? cover.filePath : cover || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value
    }
    // console.log(data)

    mutation.mutate(data)
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover} >
          <button className="cursor-pointer w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add a cover image
          </button>
        </Upload>
        
        <input 
          className="text-4xl font-semibold bg-transparent outline-none" 
          type="text" 
          placeholder="My Awesome Story" 
          name="title" 
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">Choose a category:</label>
          <select name="category" id="" className="p-2 rounded-xl bg-white shadow-md">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea name="desc" placeholder="A Short Description" className="p-4 rounded-xl bg-white shadow-md" />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg} >
              📊
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo} >
              ▶
            </Upload>
          </div>
          <Suspense fallback={<p>Loading editor...</p>}>
            <ReactQuill
              theme="snow"
              className="flex-1 rounded-xl bg-white shadow-md"
              value={value}
              onChange={setValue}
              readOnly={progress > 0 && progress < 100}
            />
          </Suspense>
        </div>          
        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)} 
          className="cursor-pointer bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          { mutation.isPending ? "Loading..." : "Send" }
          {/* Send */}
        </button>
        {"Progress: " + progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  )
}