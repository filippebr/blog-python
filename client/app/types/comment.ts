export interface CommentProps {
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