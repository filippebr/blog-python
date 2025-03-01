import Image from "./image"

export default function PostListItem() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="md:hidden xl:block">
        <Image src="postImg.jpeg" alt="post image" className="rounded-2xl object-cover" />
      </div>
      {/* details */}

    </div>
  )
}