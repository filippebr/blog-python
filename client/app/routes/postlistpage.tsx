import { useState } from "react"
import PostList from "~/components/postlist"
import SideMenu from "~/components/sidemenu"
import type { Route } from "./+types/postlistpage"

export async function loader({ params }: Route.LoaderArgs) {
  const postId = params.slug

  return { postId }
}

export default function PostListPage({ loaderData }: Route.ComponentProps) {

  const [open, setOpen] = useState(false)

  return (
    <div className="">
      {/* <p>
        Post Id: { loaderData.postId } 
      </p> */}
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <button onClick={() => setOpen(prev => !prev)} className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden">
        {open ? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="">
          <PostList /> 
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  )
}

// https://medium.com/@nomannayeem/react-router-7-the-ultimate-guide-to-the-new-features-and-framework-capabilities-06e7f06981f6