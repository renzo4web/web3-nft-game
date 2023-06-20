import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Center,
  Stack,
  VStack,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Custom404() {
  return (
    <VStack textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Image
        borderRadius={'md'}
        alt="wandering hero"
        maxW={330}
        src="https://res.cloudinary.com/dsdziwljt/image/upload/v1687216368/1aec1f30-1508-4c02-add1-f619b1a8c14c_dzlrn3.jpg"
      />
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text maxW={'45ch'} textAlign={'center'} color={'gray.500'} mb={6}>
        Lost in the realms of possibility! The hero you seek has eluded our
        grasp. Unleash your imagination and bring forth a new legend to conquer
        the unknown!
      </Text>

      <Link as={NextLink} color={'purple.500'} href={'/'}>
        Go to Battle
      </Link>
    </VStack>
  )
}
