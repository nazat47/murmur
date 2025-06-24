import { useQuery } from '@tanstack/react-query'
import { getFollowers, getFollowings, getProfile } from '../data/api-data'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const token = localStorage.getItem('murmurAccessToken')
  const navigate = useNavigate()

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

  return (
    <div className="flex-1/5 min-h-full overflow-y-auto">
      <div className="w-full p-6 flex flex-col items-center gap-4">
        <div
          className="flex flex-col gap-2 cursor-pointer"
          onClick={() => navigate(`/profile/${userProfile?.id}`)}
        >
          <img
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s'
            }
            alt={userProfile?.name}
            className="size-20 rounded-full"
          />
          <p className="font-bold text-4xl">{userProfile?.name}</p>
        </div>
        <p className="text-xl text-stone-700">{userProfile?.email}</p>
        <p>Followers: {followers?.count}</p>
        <p>Following: {followings?.count}</p>
        <p
          className="bg-red-600 text-white rounded px-2 py-2 cursor-pointer"
          onClick={() => {
            localStorage.removeItem('murmurAccessToken')
            window.location.reload()
          }}
        >
          Logout
        </p>
      </div>
    </div>
  )
}

export default Profile
