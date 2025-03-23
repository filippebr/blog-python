import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import PostListItem from "./postlistitem"

const fetchPosts = async (pageParam: number) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}posts`, {
    params: { page: pageParam}
  })
  
  return res.data
}

export default function PostList() {
  const {
    data,
    error, 
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  if (status === "pending") return 'Loading...'

  if (status === "error") return "Something went wrong!"

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