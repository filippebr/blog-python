import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Comment from "./comment"

interface Comment {
  _id: string;
  user: {
    _id: string;
    username?: string;
  };
  post: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentProps {
  postId: string
}

const fetchComments = async(postId: string) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
  return res.data
} 

export default function Comments({ postId }: CommentProps) {

  const { getToken } = useAuth() 

  const { isPending, error, data } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId)
  }) 

  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: async (newComment: CommentProps) => {
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/comments`, newComment, {
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
  })

  if (isPending) return "Loading..."
  if (error ) return "Something went wrong!" + error.message

  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <div className="flex items-center justify-between gap-8 w-full">
        <textarea placeholder="Write a comment..." className="w-full p-4 rounded-xl" />
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">Send</button>
      </div>
      {data.map((comment) => 
        <Comment key={comment._id} comment={comment} />
      )}
    </div>
  )
}