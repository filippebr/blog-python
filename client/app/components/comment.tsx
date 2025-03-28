import { format } from "timeago.js"
import Image from "./image"

// comment.tsx
interface CommentProps {
  comment: {
    _id: string;
    user: {
      _id: string;
      username?: string;
      img?: string;
    };
    post: string;
    desc: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Image 
            src={comment.user.img} 
            alt="comment profile" 
            className="w-10 h-10 rounded-full object-cover" 
            w="40"
          />
        )}
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">{format(comment.createdAt())}</span>
      </div> 
      <div className="mt-4">
        <p>
          {comment.desc}
        </p>
      </div>
    </div>
  )
}