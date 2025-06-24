import React, { useState } from 'react'
import { createMurmur } from '../data/api-data'
import { Murmur } from '../types/types'
import { QueryClient, useQueryClient } from '@tanstack/react-query'

const Dialog = ({
  dialogOpen,
  setDialogOpen,
}: {
  dialogOpen: boolean
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const token = localStorage.getItem('murmurAccessToken')

  const queryClient = useQueryClient()

  const [murmurData, setMurmurData] = useState<Partial<Murmur>>({
    title: '',
    content: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createMurmur(token!, murmurData)
    setDialogOpen(false)
    setMurmurData({
      title: '',
      content: '',
    })
    queryClient.invalidateQueries({
      queryKey: ['my-murmurs', token],
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 overflow-hidden z-[99] flex items-center justify-center">
      <div className="w-[70%] h-[60vh] bg-white rounded p-8 relative">
        <p
          className="border rounded-lg absolute right-2 top-2 size-8 flex items-center justify-center text-lg cursor-pointer"
          onClick={() => setDialogOpen(false)}
        >
          x
        </p>
        <h2 className="text-stone-400">Whats on your mind?</h2>
        <form className="w-full p-6 rounded space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full rounded-lg p-2 border border-stone-300"
            value={murmurData.title}
            onChange={(e) =>
              setMurmurData({ ...murmurData, title: e.target.value })
            }
          />
          <textarea
            value={murmurData.content}
            onChange={(e) =>
              setMurmurData({ ...murmurData, content: e.target.value })
            }
            placeholder="Content"
            rows={5}
            className="w-full rounded-lg p-2 border border-stone-300 resize-none "
          ></textarea>
          <button className="text-white bg-blue-500 rounded-lg p-2 w-full">
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dialog
