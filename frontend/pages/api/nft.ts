import { NextApiRequest, NextApiResponse } from 'next'
import {
  getNFTMetadata,
  getNFTMetadataFromAddress,
} from '../../services/getNFTMetadata'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get the id from the boyd
    const nftId = req?.query?.nftId as string // example api/nft?id=1
    const address = req?.query?.address as string // example api/nft?address=0x1231232131232kl2j312ljk3

    let data = null
    if ((!nftId && !address) || (nftId && address)) {
      return null
    }

    if (address) {
      data = await getNFTMetadataFromAddress(address)
    }

    if (nftId) {
      data = await getNFTMetadata(nftId)
    }

    return res.status(200).json(data)
  } catch (e) {
    console.log({ e })
    return res.status(500).json({ error: 'error' })
  }
}
