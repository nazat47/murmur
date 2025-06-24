import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getProfile, getTimeline } from '../data/api-data'
import MurmurCard from './murmur-card'

const Timeline = () => {
  const token = localStorage.getItem('murmurAccessToken')

  const { data: userProfile } = useQuery({
    queryKey: ['my-profile', token],
    queryFn: () => getProfile(token!),
  })

  const {
    data: timeline,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['timeline-murmurs', token],
    queryFn: ({ pageParam = 1 }) => getTimeline(token!, pageParam, 10),
    getNextPageParam: (currentPage) => currentPage?.nextPage ?? undefined,
    initialPageParam: 1,
  })

  const timelineData = timeline?.pages?.flatMap((page) => page?.murmurs) ?? []

  return (
    <div className="flex-3/5 min-h-full overflow-y-auto p-8">
      <h1 className="font-bold text-xl">Timeline</h1>
      <div className="p-4">
        {isFetchingNextPage ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-10 w-full">
            {timelineData?.map((timeline: any) => (
              <MurmurCard profile={userProfile} murmur={timeline?.murmur} />
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
  )
}

export default Timeline
