import { Link } from "react-router"
import Image from "~/components/image"

export default function SinglePost() {
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet porro vitae consequuntur.
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link to="">John Doe</Link>
            <span>on</span>
            <Link to="">Web Design</Link>
            <span>2 days ago</span>
          </div>          
        </div>
        <div className="hidden lg:block w-2/5">
          <Image src="postImg.jpeg" alt="single post" />
        </div>
        <div className=""></div>
      </div>
      {/* content */}

    </div>
  )
}