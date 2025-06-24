import React, { useState } from 'react'
import { Murmur, User } from '../types/types'
import { deleteMurmur, toggleLike } from '../data/api-data'
import { useQueryClient } from '@tanstack/react-query'

const MurmurCard = ({ murmur, profile }: { murmur: Murmur; profile: User }) => {
  const queryClient = useQueryClient()
  const token = localStorage.getItem('murmurAccessToken')
  const [editOptionOpen, setEditOptionOpen] = useState<string | null>(null)

  const isLiked = (murmur: Murmur) => {
    return murmur?.likedBy?.some((likedBy) => likedBy?.id === profile?.id)
  }

  const handleLike = async (murmur: Murmur) => {
    await toggleLike(token!, murmur.id)
    queryClient.invalidateQueries({
      queryKey: ['my-murmurs', token],
    })
    queryClient.invalidateQueries({
      queryKey: ['timeline-murmurs', token],
    })
  }

  const handleDelete = async (murmurId: string) => {
    await deleteMurmur(token!, murmurId)
    queryClient.invalidateQueries({
      queryKey: ['my-murmurs', token],
    })
    queryClient.invalidateQueries({
      queryKey: ['timeline-murmurs', token],
    })
  }
  return (
    <div
      key={murmur?.id}
      className="rounded shadow-lg p-3 min-h-[300px] w-full border border-stone-200 flex flex-col justify-between"
    >
      <div className="flex items-center gap-4 w-full">
        <img
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&s'
          }
          alt={profile?.name}
          className="size-8 rounded-full"
        />
        <p className="font-bold">{murmur?.author?.name}</p>
        {murmur?.author?.id === profile?.id && (
          <div
            className="ml-auto space-y-1 cursor-pointer relative w-[30px] flex items-center flex-col"
            onClick={() =>
              setEditOptionOpen((prev) => {
                if (prev === null) return murmur.id
                else return null
              })
            }
          >
            <div className="size-1 rounded-full bg-black" />
            <div className="size-1 rounded-full bg-black" />
            <div className="size-1 rounded-full bg-black" />
            {editOptionOpen && editOptionOpen === murmur.id && (
              <div className="absolute right-10 -bottom-4 px-4 py-2 bg-white z-[2] rounded border text-xs">
                <p onClick={() => handleDelete(murmur?.id)}>Delete</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-bold">{murmur?.title}</p>
        <p className="text-2xl">{murmur?.content}</p>
        <p className="text-xs text-stone-500">
          {new Date(murmur?.createdAt).toLocaleString()}
        </p>
      </div>
      <section className="flex items-center gap-4">
        <p>{murmur?.likedBy?.length}</p>
        <button
          className="text-blue-600  cursor-pointer"
          onClick={() => handleLike(murmur)}
        >
          {isLiked(murmur) ? 'Unlike' : 'Like'}
        </button>
      </section>
    </div>
  )
}

export default MurmurCard
