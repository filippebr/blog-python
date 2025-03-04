import { useUser } from "@clerk/clerk-react"
import React, { Suspense } from "react"
// import ReactQuill from "react-quill-new"
// import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = React.lazy(() => import('react-quill-new'))

export default function Write() {

  const {isLoaded, isSignedIn} = useUser()

  if(!isLoaded) {
    return <div className="">Loading...</div>
  }

  if(isLoaded && !isSignedIn) {
    return <div className="">You should login!</div>
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 >Create a New Post</h1>
      <form action="">
        <button>Add a cover image</button>
        <input type="text" placeholder="My Awesome Story" />
        <div className="">
          <label htmlFor="">Choose a category:</label>
          <select name="cat" id="">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea name="desc" placeholder="A Short Description" />
        <Suspense fallback={<p>Loading editor...</p>}>
          <ReactQuill
            theme="snow"
          />
        </Suspense>
        <button>Send</button>
      </form>
    </div>
  )
}