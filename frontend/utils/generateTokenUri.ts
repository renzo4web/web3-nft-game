import { TokenURI } from '../types/types'

type UrlsType = {
  regular: string
}

type UserType = {
  username: string
}

// This data comes from the Unsplash API
// https://unsplash.com/developers
type DataType = {
  description: string
  urls: UrlsType
  user: UserType
  views: number
  width: number
  height: number
  downloads: number
}

export const generateTokenUri = (data: DataType) => {
  const tokenUri = {
    description: data.description,
    image: data.urls.regular,
    name: data.user.username,
    attributes: [
      {
        trait_type: 'Views',
        value: data.views,
      },
      {
        trait_type: 'Width',
        value: data.width,
      },
      {
        trait_type: 'Height',
        value: data.height,
      },
      {
        trait_type: 'Downloads',
        value: data.downloads,
      },
    ],
  }

  return JSON.stringify(tokenUri)
}

export function decodeTokenUri(tokenData: any) {
  const regex = /data:application\/json;base64,(.*)/
  const match = tokenData?.toString()?.match(regex)
  const base64String = match?.[1]

  const tokenUriData: TokenURI = !!base64String
    ? JSON.parse(atob(base64String))
    : null

  return tokenUriData
}
