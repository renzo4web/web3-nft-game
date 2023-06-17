import { WarningTwoIcon } from '@chakra-ui/icons'
import { Heading, Box, Text } from '@chakra-ui/react'

export default function ConnectWalletBanner() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Connect Your Wallet for Unmatched Control!
      </Heading>
      <Text color={'gray.500'}>
        To experience unparalleled security and control over your in-game
        assets, connect your wallet.
      </Text>
    </Box>
  )
}
