import { Link } from "react-router"
import Image from "./image"

export default function PostListItem() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="md:hidden xl:block">
        <Image src="postImg.jpeg" alt="post image" className="rounded-2xl object-cover" />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4">
        <Link to="/test" className="text-4xl font-semibold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis vero quia, illum dolorem.
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to="" className="text-blue-800">John Doe</Link>
          <span>on</span>
          <Link to="" className="text-blue-800">Web Design</Link>
          <span>2 days ago</span>
        </div>  
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eaque tempora quam voluptate? 
          Iste numquam voluptates veritatis molestiae officiis fugiat optio laudantium assumenda consectetur 
          ipsam? A sit enim nemo dicta.
        </p>
        <Link to="/test">Read More</Link>
      </div>
      
    </div>
  )
}