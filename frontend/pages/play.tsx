import {
  Button,
  Heading,
  Stack,
  Text,
  Center,
  useToast,
  Link,
  ListItem,
  List,
  ListIcon,
  Highlight,
  Flex,
  Divider,
} from '@chakra-ui/react'
import { GiDrippingSword } from 'react-icons/gi'
import { Layout } from '../components/layout/Layout'
import {
  chain,
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite, useNetwork,
  usePrepareContractWrite,
  useProvider,
} from 'wagmi'
import { EpicGame__factory } from '../types/typechain/factories/contracts/EpicGames.sol'
import HeroNFTCard from '../components/HeroNFTCard'
import { BOSS_METADATA } from '../constants/hero.metadata'
import { useEffect, useState } from 'react'
import { decodeTokenUri } from '../utils/generateTokenUri'
import { EpicGame as CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import {chain as chains} from "@wagmi/core";
import {useCheckLocalChain} from "../hooks/useCheckLocalChain";
import {useRouter} from "next/router";

export default function Play() {
  const account = useAccount()
  const router = useRouter()
  const toast = useToast()
  const provider = useProvider()
  const [hitBossEventList, setHitBossEventList] = useState([])
  const {isLocalChain} = useCheckLocalChain()
  const {chain:currentChain} = useNetwork()
  const isRightNetwork = isLocalChain ? (currentChain?.id === chains.localhost.id) : (currentChain?.id === chains.sepolia.id)


  const epicGameContract = {
    address: CONTRACT_ADDRESS,
    abi: EpicGame__factory.abi,
    chainId: chain.localhost.id, // TODO: change to chain.goerli.id
  }

  const { data, isLoading, error } = useContractReads({
    contracts: [
      {
        ...epicGameContract,
        functionName: 'boss',
      },
      {
        ...epicGameContract,
        functionName: 'nftHolders',
        args: [account.address],
      },
    ],
    watch: true,
    enabled: !!account,
  })
  const [bossData, holderNftData] = data ?? [{} as any]

  const { data: tokenData } = useContractRead({
    ...epicGameContract,
    functionName: 'tokenURI', // TODO: move to constant
    args: [Number(holderNftData?.toString?.() ?? 0)],
    enabled: !!holderNftData,
  })

  const { config } = usePrepareContractWrite({
    ...epicGameContract,
    functionName: 'attackBoss', // TODO: move to constant
    args: [Number(holderNftData?.toString?.())],
    enabled: !!holderNftData,
  })

  const { data: attackBossData, write: attackBoss } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      toast({
        title: 'Boss Attacked!',
        description: (
          <Center>
            <Text>
              <Link
                href={`https://goerli.etherscan.io/tx/${data?.hash}`}
                isExternal
              >
                View on Etherscan
              </Link>
            </Text>
          </Center>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Unable to attack',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })

  useEffect(() => {
    const Contract = EpicGame__factory.connect(CONTRACT_ADDRESS, provider)
    ;(async () => {
      const hitBossFilter = Contract.filters.HitBoss()

      const logs = await Contract.queryFilter(hitBossFilter)

      setHitBossEventList(
        (
          await Promise.all(
            logs?.map?.(async (e) => ({
              nft: e.args.tokenId?.toString?.(),
              bossHp: e.args.bossHp?.toString?.(),
              heroeHp: e.args.heroeHp?.toString?.(),
              timestamp: (await e.getBlock())?.timestamp,
            }))
          )
        ).sort((a, b) => b?.timestamp - a?.timestamp) as never as any
      )
    })()

    return () => {
      Contract.removeAllListeners()
    }
  }, [CONTRACT_ADDRESS, provider, attackBossData])

  const tokenUriData = decodeTokenUri(tokenData)

  const boss = {
    name: bossData?.['name']?.toString() ?? '',
    attackDamage: bossData?.['attackDamage']?.toString() ?? '',
    hp: bossData?.['hp']?.toString() ?? '',
    maxHp: bossData?.['maxHp']?.toString() ?? '',
  }

  const isHeroAlive = tokenUriData?.attributes?.[0]?.value ?? 0 > 0

  return (
    <Layout>
      <Heading as="h1" mb="8" textAlign="center">
        Legends Unleashed
      </Heading>
      <Flex direction={'column'} alignItems={'center'} mb={10}>
        <Heading as="h5" size={'md'}>
          Last Events
        </Heading>
        <Divider />
        <List>
          {hitBossEventList?.length
            ? hitBossEventList.map((e: any, idx) => (
                <ListItem key={String(e?.nft + 1 * idx)}>
                  <ListIcon as={GiDrippingSword} color="green.500" />
                  <Highlight
                    query={['Hero', 'bossHp', 'heroeHp', 'damage', 'health']}
                    styles={{ bg: 'purple.100' }}
                  >
                    {`Hero #${e?.nft} attacked the boss, dealing 50 damage and
                  leaving it with ${e?.bossHp} health. Lets keep fighting!`}
                  </Highlight>
                </ListItem>
              ))
            : 'Not events'}
        </List>
      </Flex>

      <Center>
        <Stack direction={'row'} spacing="8">
          <HeroNFTCard {...tokenUriData} />
          <Center>
            <Button
              onClick={() => attackBoss?.()}
              colorScheme="red"
              disabled={!isHeroAlive}
            >
              Attack
            </Button>
          </Center>
          <HeroNFTCard {...boss} image={BOSS_METADATA.imageUrl} isBoss />
        </Stack>
      </Center>
    </Layout>
  )
}
