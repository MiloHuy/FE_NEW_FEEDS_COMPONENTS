export enum EStatusPost {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export interface IPost {
  id: string
  userId: string
  username: string
  content: string
  status: EStatusPost
  mediaUrl: string | null
  likeCount: number
  replyCount: number
  createdAt: string
}
