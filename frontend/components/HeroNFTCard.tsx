import {
  Card,
  CardBody,
  Stack,
  Image,
  Text,
  Heading,
  Progress,
  Divider,
  CardFooter,
  Button,
} from '@chakra-ui/react'
import { TokenURI } from '../types/types'
import { percentage } from '../utils/percentage'

interface Props extends TokenURI {
  isBoss?: boolean
  maxHp?: string
  hp?: string
  attackDamage?: string
}

export default function HeroNFTCard({
  image,
  name,
  attributes,
  isBoss = false,
  hp,
  attackDamage,
  maxHp,
  ...rest
}: Props) {
  const currentHealth = isBoss
    ? percentage(Number(hp), Number(maxHp))
    : percentage(
        attributes?.find?.(({ trait_type }) => trait_type === 'Health Points')
          ?.value ?? 0,
        attributes?.find?.(({ trait_type }) => trait_type === 'Health Points')
          ?.max_value ?? 0
      )
  const damage = isBoss
    ? attackDamage
    : attributes?.find?.(({ trait_type }) => trait_type === 'Attack Damage')
        ?.value

  return (
    <Card maxW="md">
      <CardBody>
        <Image src={image} alt={name} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading textAlign={'center'} size="md">
            {name ?? 'Malvorn, the Spiked General'}
          </Heading>
          <Text textAlign={'center'} fontWeight={'bold'}>
            Damage : {damage}
          </Text>
          <Text textAlign={'center'} fontWeight={'bold'}>
            Health : {currentHealth} / 100
          </Text>
          <Stack spacing={5}>
            <Progress
              colorScheme={currentHealth < 20 ? 'red' : 'green'}
              height="32px"
              value={currentHealth}
            />
          </Stack>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  )
}
