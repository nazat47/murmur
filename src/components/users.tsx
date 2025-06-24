import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getNonFollowings, toggleFollow } from '../data/api-data'
import { User } from '../types/types'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const token = localStorage.getItem('murmurAccessToken')
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: users, isLoading } = useQuery({
    queryKey: ['non-followers'],
    queryFn: () => getNonFollowings(token!),
  })

  const handleFollow = async (userId: number) => {
    await toggleFollow(token!, userId.toString())
    queryClient.invalidateQueries({ queryKey: ['non-followers'] })
  }

  return (
    <div className="flex-1/5 min-h-full overflow-y-auto p-4">
      <h2 className="mx-auto font-black mb-6">Users you may want to follow</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {users?.map((user: User) => (
            <div
              key={user.id}
              className="flex flex-col items-center justify-center gap-2 text-center rounded-lg border border-stone-200 p-2"
            >
              <img
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s'
                }
                alt={user.name}
                className="size-8 rounded-full"
                onClick={() => navigate(`/profile/${user?.id}`)}
              />
              <div className="flex justify-between items-center w-full">
                <p className="font-bold">{user.name}</p>
                <button
                  onClick={() => handleFollow(user.id)}
                  className="text-xs bg-blue-400 rounded-lg text-white p-1"
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
