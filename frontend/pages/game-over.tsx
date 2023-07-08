import { Layout } from '../components/layout/Layout'
import { Image, Container, Heading, Text, Center } from '@chakra-ui/react'

function EndGame() {
  return (
    <Layout>
      <Container maxW={'container.md'}>
        <Heading as="h1" mb="8" textAlign="center">
          Game Over 😢
        </Heading>
        <Text color={'gray.500'} textAlign={'center'} my={3}>
          We regret to inform you that your hero has fallen. Though defeated, we
          hope you`ve cherished the journey thus far. Our dedicated development
          team is diligently working on a way to bring heroes back to life. Stay
          vigilant and keep an eye out for exciting updates and the possibility
          of revival. Your heroic tale is far from over.
        </Text>
        <Center>
          <Image
            boxSize="300px"
            rounded={'xl'}
            alt={'Legend Unleashed'}
            src={
              'https://res.cloudinary.com/dsdziwljt/image/upload/v1688775742/c0b9cb3b-1050-4e5a-867a-5e7c5bf36812_d5gp56.jpg'
            }
          />
        </Center>
      </Container>
    </Layout>
  )
}

export default EndGame
