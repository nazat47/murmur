import axios from 'axios'
import { apiUrl } from '../config'
import { Murmur } from '../types/types'

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/user`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getFollowers = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/user/my/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getFollowings = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/user/my/followings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getUser = async (id: string, token: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getProfile = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/user/profile/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getNonFollowings = async (token: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/user/my/non-followings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const toggleFollow = async (token: string, userId: string) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/user/toggle-follow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getMurmurs = async (
  token: string,
  page?: number,
  limit?: number,
) => {
  try {
    const { data } = await axios.get(`${apiUrl}/murmur`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    })
    return {
      murmurs: data?.data,
      nextPage:
        data?.meta?.totalPages > data?.meta?.currentPage
          ? data?.meta?.currentPage + 1
          : null,
    }
  } catch (error) {
    console.log(error)
  }
}

export const createMurmur = async (token: string, murmur: Partial<Murmur>) => {
  try {
    const { data } = await axios.post(`${apiUrl}/murmur`, murmur, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteMurmur = async (token: string, murmurId: string) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/murmur/${murmurId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const toggleLike = async (token: string, murmurId: string) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/murmur/like/${murmurId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getTimeline = async (
  token: string,
  page: number,
  limit: number,
) => {
  try {
    const { data } = await axios.get(`${apiUrl}/timeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    })

    return {
      murmurs: data?.data,
      nextPage:
        data?.meta?.totalPages > data?.meta?.currentPage
          ? data?.meta?.currentPage + 1
          : null,
    }
  } catch (error) {
    console.log(error)
  }
}
