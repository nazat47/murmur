export type User = {
  id: number
  name: string
  email: string
  password: string
  isActive: boolean
  murmurs: Murmur[]
  followers: Follow[]
  following: Follow[]
}

export type Follow = {
  id: string
  followedUser: User
  followedBy: User
  createdAt: Date
  updatedAt: Date
}

export type Murmur = {
  id: string
  title: string
  content: string
  author: User
  likedBy: User[]
  createdAt: Date
  updatedAt: Date
}

export type Timeline = {
  id: number
  murmur: Murmur
  user: User
  createdAt: Date
  updatedAt: Date
}
