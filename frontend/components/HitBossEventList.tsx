import { useProvider } from 'wagmi'
import {
  Center,
  Heading,
  Highlight,
  Text,
  List,
  ListIcon,
  ListItem,
  VStack,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { GiBarbute, GiDrippingSword } from 'react-icons/gi'
import { EpicGame__factory } from '../types/typechain'
import { EpicGame as CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'

enum EventType {
  CreatedHero = 'CreatedHero',
  HitBoss = 'HitBoss',
}

interface HitBossEvent {
  nft: string
  bossHp: string
  heroeHp: string
}

interface CreatedHeroEvent {
  heroName: string
  from: string
}

interface Events {
  type: EventType
  data: any
  timestamp: number
}

export default function HitBossEventList() {
  const [hitBossEventList, setHitBossEventList] = useState<[] | Events[]>([])
  const provider = useProvider()

  useEffect(() => {
    const Contract = EpicGame__factory.connect(CONTRACT_ADDRESS, provider)
    ;(async () => {
      const hitBossFilter = Contract.filters.HitBoss()
      const createdHeroFilter = Contract.filters.CreatedHero()

      const logsHistBoss = await Contract.queryFilter(hitBossFilter)
      const logsCreatedHero = await Contract.queryFilter(createdHeroFilter)

      setHitBossEventList(
        (
          await Promise.all([
            ...(logsCreatedHero?.map?.(async (e) => ({
              type: EventType.CreatedHero,
              data: {
                heroName: e.args.heroName?.toString?.(),
                from: e.args.from?.toString?.(),
              },
              timestamp: (await e.getBlock())?.timestamp ?? 0,
            })) ?? []),
            ...(logsHistBoss?.map?.(async (e) => ({
              type: EventType.HitBoss,
              data: {
                nft: e.args.tokenId?.toString?.(),
                bossHp: e.args.bossHp?.toString?.(),
                heroeHp: e.args.heroeHp?.toString?.(),
              },
              timestamp: (await e.getBlock())?.timestamp ?? 0,
            })) ?? []),
          ])
        )
          .filter(Boolean)
          .sort((a, b) => b?.timestamp - a?.timestamp) as never as any
      )
    })()

    return () => {
      Contract.removeAllListeners()
    }
  }, [provider])

  return (
    <Card variant={'outline'}>
      <CardHeader>
        <Heading textAlign={'center'} size={'md'}>
          Events
        </Heading>
      </CardHeader>
      <CardBody>
        <List>
          {!!hitBossEventList?.length ? (
            hitBossEventList.map((e, idx) =>
              // TODO: simplify this to one component
              e.type === EventType.CreatedHero ? (
                <ListItem key={String(e?.data?.heroName + 1 * idx)}>
                  <ListIcon as={GiBarbute} color="green.500" />
                  <Highlight
                    query={['battle', 'hero']}
                    styles={{ bg: 'purple.100' }}
                  >
                    {`A new Hero (${e?.data?.heroName}) has joined the battle!`}
                  </Highlight>
                  <Text
                    textAlign={'right'}
                    color="gray.400"
                    display={'block'}
                    as="i"
                  >
                    {new Date(e?.timestamp * 1000).toLocaleString()}
                  </Text>
                  <Divider />
                </ListItem>
              ) : (
                <ListItem key={String(e?.data?.nft + 1 * idx)}>
                  <ListIcon as={GiDrippingSword} color="green.500" />
                  <Highlight
                    query={['Hero', 'bossHp', 'heroeHp', 'damage', 'health']}
                    styles={{ bg: 'purple.100' }}
                  >
                    {`Hero #${e?.data?.nft} attacked the boss, dealing 50 damage and
                  leaving it with ${e?.data?.bossHp} health. Lets keep fighting!`}
                  </Highlight>
                  <Text
                    color="gray.400"
                    textAlign={'right'}
                    display={'block'}
                    as="i"
                  >
                    {new Date(e?.timestamp * 1000).toLocaleString()}
                  </Text>
                  <Divider my={2} />
                </ListItem>
              )
            )
          ) : (
            <Text>Not events</Text>
          )}
        </List>
      </CardBody>
      <CardFooter>
        <Text textAlign="center" fontSize="xs" color="gray.500">
          This is happening on the battlefield!
        </Text>
      </CardFooter>
    </Card>
  )
}
