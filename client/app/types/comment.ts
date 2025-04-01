// Base comment interface for a full comment object
export interface CommentProps {
  _id: string
  user: {
    _id: string
    username?: string
    img?: string
  };
  post: string
  desc: string
  createdAt: string
  updatedAt: string
}

// Props specifically for the Comment component
export interface CommentComponentProps {
  comment: CommentProps
}

// Props for the Comments component
export interface CommentsComponentProps {
  postId: string
  desc: string
}

// Props for creating a new comment
export interface NewComment {
  postId: string
  desc: string
}