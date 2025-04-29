import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router"
import type { PostListItemProps } from "~/types/post"
// import { toast } from "react-toastify"

export default function PostMenuActions({ post }: PostListItemProps ) {
  const { user, isLoaded: isAuthLoaded } = useUser()
  const { getToken, isLoaded: isUserLoaded } = useAuth()
  const navigate = useNavigate()

  const { 
    isPending, 
    error, 
    data: savedPosts 
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => { 

      if (!isAuthLoaded || !isUserLoaded) {
        throw new Error("Authentication not ready")
      }

      const token = await getToken()
    
      if (!token) {
        console.error("No token found!")
        throw new Error("Unauthorized: No token")
      }
    
      const apiUrl = import.meta.env.VITE_API_URL
      if (!apiUrl) {
        console.error("Missing API URL")
        throw new Error("Missing API base URL")
      }
    
      const res = await axios.get(`${apiUrl}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    
      return res.data
    },
    // enabled: isAuthLoaded && isUserLoaded && !!user && !!user.id,
    enabled: isAuthLoaded && isUserLoaded && !!user && !!user.id,
    retry: (failureCount, error) => {
      if (error.message.includes("401")) return false
      return failureCount < 3
    },
  })

  const isAdmin = user?.publicMetadata?.role === "admin" || false
  const isSaved = savedPosts?.some((p: string) => p === post._id) || false
  // console.log("savedPosts:", savedPosts, "isSaved:", isSaved)

  const deleteMutation = useMutation({
    mutationFn: async() => {
      const token = await getToken()  

      if (!token) {
        throw new Error("Unauthorized: No token")
      }    

      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      // toast.success("Post deleted successfully!")
      navigate("/")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          // toast.error("You need to log in to save posts!")
          navigate("/login")
        } else {
          // toast.error(error.response?.data || "An error occurred")
        }
      } else {
        // toast.error('Something went wrong with axios')
      }
    },
  })

  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: async() => {
      const token = await getToken()

      if (!token) {
        throw new Error("Unauthorized: No token")
      }
      
      return axios.patch(`${import.meta.env.VITE_API_URL}/users/save`, 
        {
          postId: post._id,
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"]})
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // toast.error(error.response?.data)
      } else {
        // toast.error('Something went wrong with axios')
      }
    },
    retry: (failureCount, error) => {
      if (error.message.includes("401")) return false
      return failureCount < 3
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