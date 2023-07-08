import { ethers } from 'ethers'
import { EpicGame__factory } from '../types/typechain'
import { EpicGame as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import { decodeTokenUri } from '../utils/generateTokenUri'

export function getContract() {
  const isLocal = process?.env?.NODE_ENV === 'development'

  // const providerUrl = isLocal
  //   ? 'http://localhost:8545'
  //   : process.env.ALCHEMY_API_URL

  //
  const providerUrl = process.env.ALCHEMY_API_URL

  const provider = new ethers.providers.JsonRpcProvider(providerUrl)

  const CONTRACT_ADDRESS = LOCAL_CONTRACT_ADDRESS

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    EpicGame__factory.abi,
    provider
  )
  return contract
}

export async function getNFTMetadata(nftId: string): Promise<any> {
  try {
    const contract = getContract()
    const [res] = await contract.functions['tokenURI'](Number(nftId))

    if (!res) {
      return null
    }

    const data = decodeTokenUri(res)

    return data
  } catch (e) {
    console.log(e)
  }
}

export async function getNFTMetadataFromAddress(address: string) {
  try {
    const contract = getContract()
    // players should only have one hero
    const [nfts] = await contract.functions['nftHolders'](address)

    if (!nfts) {
      return null
    }

    const [res] = await contract.functions['tokenURI'](
      Number(nfts?.toString?.())
    )

    if (!res) {
      return null
    }

    const data = decodeTokenUri(res)

    if (!data?.name) {
      return null
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
