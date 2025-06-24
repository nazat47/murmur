import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  getFollowers,
  getFollowings,
  getMurmurs,
  getProfile,
  getUser,
  toggleFollow,
} from '../data/api-data'
import MurmurCard from '../components/murmur-card'
import { useState } from 'react'
import Dialog from '../components/dialog'
import { Murmur, User } from '../types/types'

const ProfilePage = () => {
  const { id } = useParams()
  const token = localStorage.getItem('murmurAccessToken')
  const [dialogOpen, setDialogOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: profile } = useQuery({
    queryKey: ['user-details', id],
    queryFn: () => getUser(id!, token!),
  })

  const { data: userProfile } = useQuery({
    queryKey: ['my-profile', token],
    queryFn: () => getProfile(token!),
  })

  const { data: followers } = useQuery({
    queryKey: ['my-followers'],
    queryFn: () => getFollowers(token!),
  })

  const { data: followings } = useQuery({
    queryKey: ['my-followings'],
    queryFn: () => getFollowings(token!),
  })

  const {
    data: murmurs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['my-murmurs', token],
    queryFn: ({ pageParam = 1 }) => getMurmurs(token!, pageParam, 10),
    getNextPageParam: (currentPage) => currentPage?.nextPage ?? undefined,
    initialPageParam: 1,
  })

  const myMurmurs = murmurs?.pages?.flatMap((page) => page?.murmurs) ?? []

  const isMyProile = () => {
    return Number(id) === Number(userProfile?.id)
  }
  const handleUnfollow = async (userId: number) => {
    await toggleFollow(token!, userId.toString())
    queryClient.invalidateQueries({ queryKey: ['non-followers'] })
    queryClient.invalidateQueries({ queryKey: ['my-followings'] })
  }
  return (
    <div className="w-screen min-h-screen overflow-y-auto py-8 overflow-x-hidden flex gap-3">
      <div className="w-[70%] h-auto">
        <div className="w-full flex flex-col gap-4 border-b border-stone-300  py-10">
          <div className="w-full flex items-center justify-start gap-6">
            <img
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s'
              }
              alt={profile?.name}
              className="size-20 rounded-full"
            />
            <div>
              <p className="font-bold">{profile?.name}</p>
              <p className="font-bold text-stone-600">{profile?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <p>Followers: {followers?.count}</p>
            <p>Followings: {followings?.count}</p>
            {isMyProile() && (
              <button
                onClick={() => setDialogOpen(true)}
                className="text-4xl text-white bg-blue-500 rounded-full size-12 flex items-center justify-center ml-auto cursor-pointer"
              >
                +
              </button>
            )}
          </div>
        </div>
        <div className="p-4">
          {isFetchingNextPage ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-10 w-full">
              {myMurmurs?.map((murmur: Murmur) => (
                <MurmurCard profile={profile} murmur={murmur} />
              ))}
            </div>
          )}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="text-white bg-stone-700 rounded p-2 mx-auto mt-20"
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <div className="grow border-l p-8">
        <h2 className="mb-4">Following</h2>
        <div className="flex flex-col gap-4">
          {followings?.followings?.map((follow: User) => (
            <div className="flex justify-between" key={follow.id}>
              <div>
                <img
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s'
                  }
                  alt={follow?.name}
                  className="size-8 rounded-full"
                />
                <p className="font-bold">{follow?.name}</p>
              </div>
              <button
                onClick={() => handleUnfollow(follow.id)}
                className="text-xs bg-red-400 rounded-lg text-white p-1"
              >
                Unfollow
              </button>
            </div>
          ))}
        </div>
      </div>
      {isMyProile() && dialogOpen && (
        <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      )}
    </div>
  )
}

export default ProfilePage
