import { GetServerSideProps } from 'next'
import { getNFTMetadata } from '../../services/getNFTMetadata'
import { Layout } from '../../components/layout/Layout'
import {
  Button,
  Center,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { TokenURI } from '../../types/types'
import HeroNFTCard from '../../components/HeroNFTCard'
import { GiSwordBrandish } from 'react-icons/gi'
import Link from 'next/link'
import HitBossEventList from '../../components/HitBossEventList'

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { id } = context.query

  try {
    const data = await getNFTMetadata(id as string)

    if (!data || !data?.name) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        nftData: data,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    }
  }
}

interface Props {
  nftData: TokenURI
}

export default function HeroPage({ nftData }: Props) {
  console.log(nftData)
  const isHeroAlive =
    nftData?.attributes?.find((atr) => atr.trait_type === 'Health Points')
      ?.value ?? 0 > 0

  console.log(isHeroAlive)
  return (
    <Layout>
      <Container maxW={'container.lg'}>
        <Center>
          <SimpleGrid
            order={'revert'}
            columns={{ base: 1, md: 2 }}
            spacing={10}
          >
            <HitBossEventList />
            <VStack>
              <Heading>{nftData.name}</Heading>
              <HeroNFTCard {...nftData} />
              <Button
                as={isHeroAlive ? Link : undefined}
                href={'/play'}
                mt={5}
                size={'lg'}
                width={{ md: '95%' }}
                leftIcon={<GiSwordBrandish />}
                colorScheme="purple"
                variant="solid"
                isDisabled={!isHeroAlive}
              >
                Battle
              </Button>
            </VStack>
          </SimpleGrid>
        </Center>
      </Container>
    </Layout>
  )
}
