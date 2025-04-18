import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link, useParams } from "react-router"
import { format } from "timeago.js"
import Comments from "~/components/comments"
import Image from "~/components/image"
import PostMenuActions from "~/components/postmenuactions"
import Search from "~/components/search"

const fetchPost = async(slug: string) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
  return res.data
} 

export default function SinglePost() {
  const { slug } = useParams<{ slug: string | undefined }>()
  
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => {
      if (!slug) {
        throw new Error("Slug is undefined"); // or handle it differently
      }
      return fetchPost(slug); // TypeScript knows slug is string here
    },
  }) 

  if (isPending) return "Loading..."
  if (error ) return "Something went wrong!" + error.message
  if (!data) return "Post not found!"

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link to="" className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link to="" className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>     
          <p className="text-gray-500 font-medium ">
            {data.desc} 
          </p>     
        </div>
        {data.img && <div className="hidden lg:block w-2/5">
          <Image src={data.img} alt="single post" w="600" className="rounded-2xl" />
        </div>}
        <div className=""></div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">          
            <div className="flex items-center gap-8 ">
              {data.user.img && <Image 
                src={data.user.img} 
                alt="author image menu" 
                className="w-12 h-12 rounded-full object-cover" 
                w="48" 
                h="48" 
              />}
              <Link to="" className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur. Iste odit voluptas eaque sunt optio eius iure sed doloremque harum.
            </p>
            <div className="flex gap-2">
              <Link to="">
                <Image src="facebook.svg" alt="facebook"/>
              </Link>
              <Link to="">
                <Image src="instagram.svg" alt="instagram"/>              
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
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
      <Comments postId={data._id} desc={data.desc} />
    </div>
  )
}