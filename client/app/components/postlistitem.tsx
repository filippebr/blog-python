import { Link } from "react-router"
import Image from "./image"

interface Post {
  _id: string; 
  img?: string; 
  title: string; 
  slug: string;
  user: string; 
  category: string; 
  date: string;  
  desc?: string;  
  content: string;
  isFeature: boolean;
  visit: number;
}

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      {post.img && <div className="md:hidden xl:block xl:w-1/3">
        <Image src={post.img} alt="post image" className="rounded-2xl object-cover" w="735" />
      </div>}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to="" className="text-blue-800">John Doe</Link>
          <span>on</span>
          <Link to="" className="text-blue-800">Web Design</Link>
          <span>2 days ago</span>
        </div>  
        <p>
          {post.desc}
        </p>
        <Link to={`/${post.slug}`} className="underline text-blue-800 text-sm">Read More</Link>
      </div>      
    </div>
  )
}