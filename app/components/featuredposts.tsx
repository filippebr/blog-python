import Image from "./image"

export default function FeaturedPosts() {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
      {/* image */}
      <Image src="/featured1.jpeg" alt="first featured" className="rounded-3xl object-cover" w={100} h={100} />
      {/* details */}
      {/* title */}
      </div>
      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">

      </div>
    </div>
  )
}