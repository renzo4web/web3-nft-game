import {
  Box,
  Center,
  Heading,
  Input,
  Link,
  Text,
  Wrap,
  WrapItem,
  useToast,
  Image,
  Container,
  Card,
  CardBody,
} from '@chakra-ui/react'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/stepper'
import { GiAbdominalArmor, GiSwordClash, GiTrophy } from 'react-icons/gi'
import { ethers, providers } from 'ethers'
import type { NextPage } from 'next'
import { useEffect, useReducer } from 'react'
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { EpicGame as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import { Layout } from '../components/layout/Layout'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import { HEROES_METADATA } from '../constants/hero.metadata'
import HeroSelection from '../components/HeroSelection'
import { EpicGame__factory } from '../types/typechain/factories/contracts/EpicGames.sol'
import ConnectWalletBanner from '../components/ConnectWalletBanner'
import { useRouter } from 'next/router'

/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

const GOERLI_CONTRACT_ADDRESS = '0x3B73833638556f10ceB1b49A18a27154e3828303'

/**
 * Prop Types
 */
type StateType = {
  heroName: string
  inputValue: string
}
type ActionType =
  | {
      type: 'SET_HERO_NAME'
      greeting: StateType['heroName']
    }
  | {
      type: 'SET_INPUT_VALUE'
      inputValue: StateType['inputValue']
    }

/**
 * Component
 */
const initialState: StateType = {
  heroName: '',
  inputValue: '',
}

const steps = [
  {
    title: 'Create',
    description: 'Create and Mint a Hero',
    icon: GiAbdominalArmor,
  },
  {
    title: 'Fight',
    description: 'Fight to won credits',
    icon: GiSwordClash,
  },
  { title: 'Win', description: 'The Winner Takes It All', icon: GiTrophy },
]

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    // Track the greeting from the blockchain
    case 'SET_HERO_NAME':
      return {
        ...state,
        heroName: action.greeting,
      }
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.inputValue,
      }
    default:
      throw new Error()
  }
}

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  const { isLocalChain } = useCheckLocalChain()

  const { isMounted } = useIsMounted()

  const CONTRACT_ADDRESS = isLocalChain
    ? LOCAL_CONTRACT_ADDRESS
    : GOERLI_CONTRACT_ADDRESS

  const { address } = useAccount()
  const toast = useToast()

  useEffect(() => {
    fetch(`/api/nft?address=${address}`)
      .then(async (res) => {
        const nftData = await res.json()
        if (nftData['NFT#']) {
          router.push(`/hero/${nftData['NFT#']}`)
        }
      })
      .catch(console.warn)
  }, [address, router])

  useEffect(() => {
    const interval = setInterval(() => {
      const nextStep = (activeStep + 1) % steps.length
      setActiveStep(nextStep)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [activeStep, setActiveStep])

  const { data, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: EpicGame__factory.abi,
    functionName: 'mintHero',
    mode: 'recklesslyUnprepared',
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      toast({
        title: 'Transaction Successful',
        description: (
          <>
            <Text>Hero created correctly!</Text>
            <Text>
              <Link
                href={`https://goerli.etherscan.io/tx/${data?.blockHash}`}
                isExternal
              >
                View on Etherscan
              </Link>
            </Text>
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
  })

  if (!isMounted) {
    return null
  }

  return (
    <Layout>
      <Heading as="h1" mb="8" textAlign="center">
        Legends Unleashed
      </Heading>
      <Center mb={10}>
        <Image
          boxSize="150px"
          rounded={'full'}
          alt="Legends Unleashed"
          src="https://res.cloudinary.com/dsdziwljt/image/upload/v1686860667/2890a1fc-047d-4897-9fc6-015a21147e12_vj8ud8.jpg"
        />
      </Center>
      <Container maxW={'container.md'}>
        <Card mb={10} variant={'outline'}>
          <CardBody>
            <Text>
              Welcome to an enchanting world of heroic adventures! Dive into our
              web3 game and embark on an epic journey where you become the hero.
              Choose from three extraordinary roles: the mighty Barbarian, the
              mystical Mage or the compassionate Healer. Craft a unique hero by
              naming them and selecting their role.
            </Text>
          </CardBody>
        </Card>
        <Stepper colorScheme="purple" index={activeStep}>
          {steps.map((step, index) => (
            <Step key={String(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<step.icon />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Container>
      {!address && <ConnectWalletBanner />}
      <Center>
        <Box maxWidth="container.xl" p="8" mt="8">
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignContent={'center'}
            justifyContent={'center'}
          >
            <Input
              bg="white"
              type="text"
              size={'lg'}
              placeholder="Your hero's name"
              disabled={!address || isLoading}
              onChange={(e) => {
                dispatch({
                  type: 'SET_INPUT_VALUE',
                  inputValue: e.target.value,
                })
              }}
            />
            <Wrap spacing={'10'}>
              {HEROES_METADATA.map(({ classHero, imageURI, ...rest }, i) => (
                <WrapItem key={imageURI}>
                  <HeroSelection
                    {...rest}
                    src={imageURI}
                    alt={classHero}
                    onClick={async () => {
                      write?.({
                        recklesslySetUnpreparedArgs: [
                          i,
                          state?.inputValue,
                          imageURI,
                        ],
                        recklesslySetUnpreparedOverrides: {
                          value: ethers.utils.parseEther('0.003'),
                        },
                      })
                    }}
                    account={{ address }}
                    heroName={state?.inputValue}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
      </Center>
    </Layout>
  )
}

export default Home
