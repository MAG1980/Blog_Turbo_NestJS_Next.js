export type PostFormState = {
  data?: {
    postId?: number
    title?: string
    content?: string
    thumbnail?: File | null
    previousThumbnail?: string
    tags?: string
    published?: boolean
  },
  errors?: {
    title?: string[]
    content?: string[]
    thumbnail?: string[]
    tags?: string[]
    published?: string[]
  },
  message?: string,
  ok?: boolean
} | undefined