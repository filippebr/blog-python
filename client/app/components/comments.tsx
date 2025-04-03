import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import type { CommentProps, CommentsComponentProps, NewComment } from "~/types/comment"
import Comment from "./comment"

const fetchComments = async(postId: string) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
  return res.data
} 

export default function Comments({ postId, desc }: CommentsComponentProps) {
  const {user} = useUser()
  const { getToken } = useAuth() 

  const { isPending, error, data } = useQuery<CommentProps[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId)
  }) 

  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: async (newComment: NewComment) => {
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId]
      })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.description)
      } else {
        toast.error('something goest wrong with axios')
      }
    }
  })

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data: NewComment = {
      postId,
      desc: formData.get("desc")?.toString() || "",
    }

    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form onSubmit={handleSubmit} className="flex items-center justify-between gap-8 w-full">
        <textarea 
          name="desc" 
          placeholder="Write a comment..." 
          className="w-full p-4 rounded-xl" 
        />
        <button className="cursor-pointer bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">Send</button>
      </form>
      {isPending 
        ? "Loading..." 
        : error 
        ? "Error loading" 
        : 
      <>
      {
        mutation.isPending && (
          <Comment comment={{
            _id: "temp_id",
            post: postId,
            desc: `${mutation.variables?.desc} (Sending...)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
              _id: user?.id || "temp-user-id",
              img: user?.imageUrl,
              username: user?.username ?? undefined,
            }
          }}/>
        )
      }
        {data?.map((comment) => 
          <Comment key={comment._id} comment={comment} />
        )}
      </>  
      }
    </div>
  )
}