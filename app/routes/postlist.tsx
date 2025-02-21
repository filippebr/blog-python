import type { Route } from "./+types/postlist"

export async function loader({ params }: Route.LoaderArgs) {
  const postId = params.slug

  return { postId }
}

export default function PostList({ loaderData }: Route.ComponentProps) {
  return (
    <div className="font-bold">
      <p>
      Post Id: { loaderData.postId } 
      </p>
    </div>
  )
}

// https://medium.com/@nomannayeem/react-router-7-the-ultimate-guide-to-the-new-features-and-framework-capabilities-06e7f06981f6