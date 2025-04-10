export type PostFormState = {
  data?: {
    title?: string
    content?: string
    thumbnail?: File | null
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