import { Link } from "react-router"
import Image from "~/components/image"
import PostMenuActions from "~/components/postmenuactions"
import Search from "~/components/search"

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
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, quibusdam. 
            Fuga corporis minima voluptatum est quia doloribus numquam necessitatibus? 
            Commodi explicabo, quod beatae fuga iusto veritatis dolorem modi recusandae inventore!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, quibusdam. 
            Fuga corporis minima voluptatum est quia doloribus numquam necessitatibus? 
            Commodi explicabo, quod beatae fuga iusto veritatis dolorem modi recusandae inventore!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, quibusdam. 
            Fuga corporis minima voluptatum est quia doloribus numquam necessitatibus? 
            Commodi explicabo, quod beatae fuga iusto veritatis dolorem modi recusandae inventore!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, quibusdam. 
            Fuga corporis minima voluptatum est quia doloribus numquam necessitatibus? 
            Commodi explicabo, quod beatae fuga iusto veritatis dolorem modi recusandae inventore!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, quibusdam. 
            Fuga corporis minima voluptatum est quia doloribus numquam necessitatibus? 
            Commodi explicabo, quod beatae fuga iusto veritatis dolorem modi recusandae inventore!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, quibusdam. 
            Fuga corporis minima voluptatum est quia doloribus numquam necessitatibus? 
            Commodi explicabo, quod beatae fuga iusto veritatis dolorem modi recusandae inventore!
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mt-8 mb-4 text-sm font-medium">Author</h1>
          <div className="">
            <Image 
              src="userImg.jpeg" 
              alt="author image menu" 
              className="w-12 h-12 rounded-full object-cover" 
              w="48" 
              h="48" 
            />
            <Link to="">John Doe</Link>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <div className="flex gap-2 ">
              <Link to="">
                <Image src="facebook.svg" alt="facebook"/>
              </Link>
              <Link to="">
                <Image src="instagram.svg" alt="instagram"/>              
              </Link>
            </div>
          </div>
          <PostMenuActions />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="underline">All</Link>
            <Link to="/" className="underline">Web Design</Link>
            <Link to="/" className="underline">Development</Link>
            <Link to="/" className="underline">Databases</Link>
            <Link to="/" className="underline">Search Engines</Link>
            <Link to="/" className="underline">Marketing</Link>
            <Link to="/" className="underline">All</Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
    </div>
  )
}