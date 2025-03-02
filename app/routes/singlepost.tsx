import { Link } from "react-router"
import Image from "~/components/image"

export default function SinglePost() {
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet porro vitae consequuntur.
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link to="" className="text-blue-800">John Doe</Link>
            <span>on</span>
            <Link to="" className="text-blue-800">Web Design</Link>
            <span>2 days ago</span>
          </div>     
          <p className="text-gray-500 font-medium ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi quaerat quam minima 
            quos voluptatem laboriosam iusto illo quasi quisquam, similique deleniti nobis, 
            iste perspiciatis voluptas assumenda beatae? Minima, a temporibus.  
          </p>     
        </div>
        <div className="hidden lg:block w-2/5">
          <Image src="postImg.jpeg" alt="single post" w="600" className="rounded-2xl" />
        </div>
        <div className=""></div>
      </div>
      {/* content */}

    </div>
  )
}