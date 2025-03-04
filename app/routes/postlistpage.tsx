import SideMenu from "~/components/sidemenu"
import PostList from "../components/postlist"
import type { Route } from "./+types/postlist"

export async function loader({ params }: Route.LoaderArgs) {
  const postId = params.slug

  return { postId }
}

export default function PostListPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="">
      {/* <p>
        Post Id: { loaderData.postId } 
      </p> */}
      <h1 className="mb-8 text-2xl">Development Blog</h1>
      <div className="flex gap-8">
        <div className="">
          <PostList /> 
        </div>
        <div className=""><SideMenu /></div>
      </div>
    </div>
  )
}

// https://medium.com/@nomannayeem/react-router-7-the-ultimate-guide-to-the-new-features-and-framework-capabilities-06e7f06981f6