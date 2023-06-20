import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getNFTMetadata } from '../../services/getNFTMetadata'
import { Layout } from '../../components/layout/Layout'
import {
  Button,
  Center,
  Container,
  Divider,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { TokenURI } from '../../types/types'
import HeroNFTCard from '../../components/HeroNFTCard'
import { GiSwordBrandish } from 'react-icons/gi'
import Link from 'next/link'

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
  return (
    <Layout>
      <Container maxW={'container.lg'}>
        <Center>
          <VStack>
            <Heading>{nftData.name}</Heading>
            <Divider />
            <HeroNFTCard {...nftData} />
            <Button
              as={Link}
              href={'/play'}
              mt={5}
              size={'lg'}
              width={{ md: '100%' }}
              leftIcon={<GiSwordBrandish />}
              colorScheme="purple"
              variant="solid"
            >
              Battle
            </Button>
          </VStack>
        </Center>
      </Container>
    </Layout>
  )
}
