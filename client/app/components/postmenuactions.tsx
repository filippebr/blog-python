import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import type { PostListItemProps } from "~/types/post"

export default function PostMenuActions({ post }: PostListItemProps ) {
  const { user } = useUser()
  const { getToken } = useAuth()

  const { 
    isPending, 
    error, 
    data: savedPosts 
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken()
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    },
  })

  const isSaved = savedPosts?.data?.some((p: string) => p === post._id) || false

  const deleteMutation = useMutation({
    mutationFn: async() => {
      const token = getToken()
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!")
    }
  })

  return (
    <div className="">
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
      {isPending ?  
        "Loading..." 
        : error 
        ? "Saved Posts fetching failed!" 
        : <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20px"
          height="20px"
        >
          <path 
            d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
            stroke="black"
            strokeWidth="2"
            fill={isSaved ? "black" : "none"}
          />
        </svg>
        <span>Save this post</span>
      </div>}
      {user && (post.user.username === user.username) && (
        <div className="flex items-center gap-2 py-2 text-sm cursor-pointer">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            className="bi bi-trash" 
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        <span>Delete this post</span>
      </div>)}
    </div>
  )
}