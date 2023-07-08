import { ChakraProvider, color, extendTheme } from '@chakra-ui/react'
import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''

// chain.localhost.multicall = {
//   address: LOCAL_CONTRACT_ADDRESS,
//   blockCreated: 0,
// }

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.sepolia,
    // DEV mode add chain.localhost
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
    //   ? [chain.sepolia, chain.goerli]
    //   : []),
  ],
  [
    alchemyProvider({
      apiKey: ALCHEMY_API_KEY,
    }),
    publicProvider(),
  ]
)

const { wallets } = getDefaultWallets({
  appName: 'Legends Unleashed',
  chains,
})

const demoAppInfo = {
  appName: 'Legends Unleashed',
}

const connectors = connectorsForWallets(wallets)

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const theme = extendTheme({
  fonts: {
    body: 'Inter, sans-serif',
    heading: `'Bakbak One',Inter, sans-serif`,
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      document.documentElement.classList.add('wf-active')
    })
  }, [])

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={demoAppInfo}
        chains={chains}
        theme={lightTheme({
          borderRadius: 'small',
          accentColor: '#B068EE',
        })}
      >
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
