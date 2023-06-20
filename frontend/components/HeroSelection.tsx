import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Progress,
} from '@chakra-ui/react'

type HeroSelectionProps = {
  src: string
  alt: string
  onClick: () => Promise<void>
  account: any
  heroName: string
  description: string
  maxHp: number
  attackDamage: number
}

export default function HeroSelection({
  src,
  account,
  alt,
  heroName,
  onClick,
  description,
  maxHp,
  attackDamage,
}: HeroSelectionProps) {
  const IMAGE = src

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={{ base: 'xl', md: '280px' }}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(25px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={{ base: 'xs', md: 180 }}
            width={{ base: 'xl', md: '280px' }}
            objectFit={'cover'}
            src={IMAGE}
            alt={alt}
          />
        </Box>
        <Stack pt={10}>
          <Heading fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>
            {alt}
          </Heading>
          <Text fontStyle={'italic'} textAlign={'center'}>
            {description}
          </Text>
          <Text textAlign={'left'} fontWeight={'bold'}>
            Health:{' '}
            <Text as={'span'} fontWeight={'normal'}>
              {maxHp}
            </Text>
          </Text>
          <Progress
            width={'100%'}
            colorScheme="green"
            size="md"
            value={maxHp}
          />
          <Text textAlign={'left'} fontWeight={'bold'}>
            Attack:{' '}
            <Text as={'span'} fontWeight={'normal'}>
              {attackDamage}
            </Text>
          </Text>
          <Progress
            width={'100%'}
            colorScheme="red"
            size="md"
            value={attackDamage}
          />
          <Button
            colorScheme="purple"
            onClick={onClick}
            mt={5}
            type="submit"
            disabled={account?.address === undefined || !heroName.trim()}
          >
            Mint
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}