export type CreateCommentFormState = {
  data?: {
    content?: string
    postId?: number
  },
  errors?: {
    content?: string[]
  },
  message?: string,
  ok?: boolean,
  open?: boolean
} | undefined