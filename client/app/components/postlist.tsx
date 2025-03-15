import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import PostListItem from "./postlistitem"

const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}posts`)
  
  return res.data
}

export default function PostList() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetchPosts(),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data)

  return (
    <div className="flex flex-col gap-12 mb-8">
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </div>
  )
}