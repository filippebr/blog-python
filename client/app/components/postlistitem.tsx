import { Link } from "react-router"
import { format } from "timeago.js"
import type { PostListItemProps } from "~/types/post"
import Image from "./image"

export default function PostListItem({ post }: PostListItemProps) {

  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      {post.img && <div className="md:hidden xl:block xl:w-1/3">
        <Image src={post.img} alt="post image" className="rounded-2xl object-cover" w="735" />
      </div>}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/posts/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to="" className="text-blue-800">{post.user.username}</Link>
          <span>on</span>
          <Link to="" className="text-blue-800">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>  
        <p>
          {post.desc}
        </p>
        <Link to={`/${post.slug}`} className="underline text-blue-800 text-sm">Read More</Link>
      </div>      
    </div>
  )
}