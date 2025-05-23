import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import type { PostListItemProps } from "~/types/post"
import { getApiUrl } from "~/utils/getApiUrl"

export default function PostMenuActions({ post }: PostListItemProps ) {
  const { user } = useUser()
  const { getToken } = useAuth()
  const navigate = useNavigate()

  const { 
    isPending, 
    error, 
    data: savedPosts 
  } = useQuery({
    queryKey: ["savedPosts"],
    // queryFn: async () => {
    //   const token = await getToken()

    //   if (!token) {
    //     console.error("No token found!")
    //     throw new Error("No token available")
    //   }
    //   const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   })

    //   return res.data
    // },
    queryFn: async () => {
      const token = await getToken()
    
      if (!token) {
        console.error("No token found!")
        throw new Error("Unauthorized: No token")
      }
    
      console.log("getApiUrl: ", getApiUrl())

      const apiUrl = getApiUrl()

      if (!apiUrl) {
        console.error("Missing API URL")
        throw new Error("Missing API base URL")
      }

      console.log("Calling API:", `${apiUrl}/users/saved`)

      const url = `${apiUrl}/users/saved`
      console.log("🔥 FINAL GET URL:", url)
    
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    
      return res.data
    },
    enabled: !!user && !!getToken,
  })

  const isAdmin = user?.publicMetadata?.role === "admin" || false
  const isSaved = savedPosts?.some((p: string) => p === post._id) || false
  // console.log("savedPosts:", savedPosts, "isSaved:", isSaved)

  const deleteMutation = useMutation({
    mutationFn: async() => {
      const token = await getToken()      
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!")
      navigate("/")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error("You need to log in to save posts!")
          navigate("/login")
        } else {
          toast.error(error.response?.data || "An error occurred")
        }
      } else {
        toast.error('Something went wrong with axios')
      }
    },
  })

  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()

      console.log("Bearer ", token)

      if (!token) throw new Error("Unauthorized: No token")
      if (!post || !post._id) throw new Error("Missing post data")
    
      const rawUrl = getApiUrl()
      if (!rawUrl) throw new Error("API base URL missing")
    
      const apiUrl = rawUrl.replace(/\/+$/, "") // remove trailing slash
      const finalUrl = `${apiUrl}/users/save`

      console.log("💥 FINAL URL being passed to Axios:", finalUrl)
    
      try {
        debugger
        const res = await axios.patch(
          finalUrl,
          { postId: post._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        return res.data
      } catch (err) {
        console.error("Save failed:", err)
        throw err
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"]})
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data)
      } else {
        toast.error('Something went wrong with axios')
      }
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const handleSave = () => {
    if (!user) {
      return navigate("/login")
    }
    saveMutation.mutate()
  }

  return (
    <div className="">
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Saved Posts fetching failed!"
      ) : (
        <div 
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleSave}
        >
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
              fill={saveMutation.isPending ? isSaved ? "black" : "none" : isSaved ? "black" : "none"}
            />
          </svg>
          <span>{isSaved ? "Unsave this post" : "Save this post"}</span>
          {saveMutation.isPending && <span className="text-xs">(in progress...)</span>}
        </div>
      )}
      {user && (post.user.username === user.username || isAdmin) && (
        <div 
          className="flex items-center gap-2 py-2 text-sm cursor-pointer" 
          onClick={handleDelete}
        >
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
        {deleteMutation.isPending && <span className="text-xs">(in progress)</span>}
      </div>)}
    </div>
  )
}