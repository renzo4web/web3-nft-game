import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Highlight,
  Input,
  Link,
  ListItem,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
  useToast,
  Image
} from '@chakra-ui/react'
import { ethers, providers } from 'ethers'
import type { NextPage } from 'next'
import { useReducer } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from 'wagmi'
import { EpicGame as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import YourContract from '../artifacts/contracts/YourContract.sol/YourContract.json'
import { Layout } from '../components/layout/Layout'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import { EpicGame as YourContractType } from '../types/typechain'
import { HEROES_METADATA } from '../constants/hero.metadata'
import HeroSelection from '../components/HeroSelection'

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

  const { isLocalChain } = useCheckLocalChain()

  const { isMounted } = useIsMounted()

  const CONTRACT_ADDRESS = isLocalChain
    ? LOCAL_CONTRACT_ADDRESS
    : GOERLI_CONTRACT_ADDRESS

  const { address } = useAccount()

  const provider = useProvider()

  const toast = useToast()

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: YourContract.abi,
    functionName: 'setGreeting',
    args: [state.inputValue],
    enabled: Boolean(state.inputValue),
  })

  const { data, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log('success data', data)
      toast({
        title: 'Transaction Successful',
        description: (
          <>
            <Text>Successfully updated the Greeting!</Text>
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

  // call the smart contract, read the current greeting value
  // async function fetchContractGreeting() {
  //   if (provider) {
  //     const contract = new ethers.Contract(
  //       CONTRACT_ADDRESS,
  //       YourContract.abi,
  //       provider
  //     ) as YourContractType
  //     try {
  //       const data = await contract.greeting()
  //       dispatch({ type: 'SET_HERO_NAME', greeting: data })
  //     } catch (err) {
  //       // eslint-disable-next-line no-console
  //       console.log('Error: ', err)
  //     }
  //   }
  // }

  if (!isMounted) {
    return null
  }

  console.log({state})
  return (
    <Layout>
      <Heading as="h1" mb="8" textAlign="center">Legends Unleashed</Heading>
      <Center mb={10}>
      <Image
          boxSize='150px'
          rounded={'full'}
          alt="Legends Unleashed"
       src="https://res.cloudinary.com/dsdziwljt/image/upload/v1686860667/2890a1fc-047d-4897-9fc6-015a21147e12_vj8ud8.jpg" />
</Center>
      <Highlight
    query={['enchanting', 'heroic', 'Barbarian', 'Mage', 'Healer', 'Malvorn, the Spiked General', 'breathtaking', 'captivating', 'web3', 'adventure']}
    styles={{ px: '2', py: '1',  bg: 'purple.100',maxW:"30ch" }}
  >
      Welcome to an enchanting world of heroic adventures! Dive into our web3 game and embark on an epic journey where you become the hero. Choose from three extraordinary roles: the mighty Barbarian, the mystical Mage or the compassionate Healer. Craft a unique hero by naming them and selecting their role.
</Highlight>
      <Center>
      <Box  maxWidth="container.xl" p="8" mt="8" >
        <Text fontSize="xl">Contract Address: {CONTRACT_ADDRESS}</Text>
        <Divider my="8" borderColor="gray.400" />
        <Box display={"flex"} flexDirection={"column"} alignContent={"center"} justifyContent={"center"}>
          <Text fontSize="lg" mb="2">Hero</Text>
          <Input
            bg="white"
            type="text"
            placeholder="Your hero's name"
            disabled={!address || isLoading}
            onChange={(e) => {
              dispatch({
                type: 'SET_INPUT_VALUE',
                inputValue: e.target.value,
              })
            }}
          />
          <Wrap  spacing={"10"}>
                {HEROES_METADATA.map(({ classHero, imageURI }, i) => (
            <WrapItem
                  key={imageURI}
            >
                <HeroSelection
                  src={imageURI}
                  alt={classHero}
                  onClick={async () => {
                    // write({
                    //   args: [i, heroName, imageURI],
                    //   overrides: {
                    //     value: ethers.utils.parseEther("0.003"),
                    //   },
                    // });
                  }}
                  account={{address}}
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
