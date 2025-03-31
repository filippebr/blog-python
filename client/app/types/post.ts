export interface PostProps {
  _id: string 
  img?: string 
  title: string 
  slug: string
  user: {
    username: string
  } 
  category: string 
  date: string  
  desc?: string  
  content: string
  isFeature: boolean
  visit: number
  createdAt: Date
  updatedAt: Date
}

export interface PostListItemProps {
  post: PostProps
}