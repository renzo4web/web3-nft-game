/* eslint-disable node/no-unpublished-import */
import { useState, useEffect } from "react";
import { useSendTransaction } from "wagmi";
import {
  useWallet,
  useWriteContract,
  useTransaction,
  ConnectWallet,
} from "@web3-ui/core";
// eslint-disable-next-line node/no-extraneous-import
import {
  Badge,
  Box,
  Container,
  Heading,
  Progress,
  Image,
  useDisclosure,
  Grid,
  GridItem,
  Button,
  Center,
} from "@chakra-ui/react";
import GameNFTAbi from "../utils/GameNFT.abi.json";
import { useReadOnlyProvider } from "@web3-ui/hooks";
// eslint-disable-next-line node/no-missing-import
import { BigNumber } from "ethers";
import HeroCard from "./HeroCard";
import { HEROES_METADATA } from "../constants/Hero.metadata.ts";

const CONTRACT_ADDRESS = "0xEb1aeaF30289246af29f9E243915B35969B4F596";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const provider = useReadOnlyProvider(
  // "https://eth-rinkeby.alchemyapi.io/v2/9PV3-6R3ofq4XeN_1gAB2SNEK2IKpY04"
  // );
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [hasNFT, setHasNFT] = useState(0);
  const { connected, correctNetwork, switchToCorrectNetwork, connection } =
    useWallet();
  const [nftContract, isReady] = useWriteContract(
    CONTRACT_ADDRESS,
    GameNFTAbi.abi
  );
  const [execute, loading] = useTransaction(nftContract?.mintHero);

  const { data, isIdle, isError, isLoading, isSuccess, sendTransaction } =
    useSendTransaction({
      request: {
        to: CONTRACT_ADDRESS,
        value: BigNumber.from("1000000000000000000"), // 1 ETH
      },
    });

  // useEffect(() => {
  // nftContract?.on("CreatedHero", (from, tokenId) => {
  // console.log(from, tokenId.toNumber());
  // setTokenId(tokenId);
  // alert(
  // `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
  // );
  // });
  // }, [isReady]);

  useEffect(() => {
    nftContract
      ?.nftHolders(connection?.userAddress!)
      .then((a: BigNumber) => setHasNFT(a.toNumber()))
      .catch(console.error);
  }, [isReady]);

  const handleClick = async (choice: number) => {
    try {
      if (!isReady) {
        return;
      }

      const hero = HEROES_METADATA.find(
        ({ heroIndex }) => heroIndex === choice
      );

      // await execute({
      // choice: hero.heroIndex,
      // _name: hero.classHero,
      // _imageURI: hero.imageURI,
      // });

      sendTransaction();

      console.log("KJDSKjd");

      // TODO: add word
      // setTokenId(null);
      // onClose();
      // await execute(words.toUpperCase());
      // setWords("");
    } catch (error) {
      console.warn(error);
    }
  };

  const onClickSwitchToCorrectNetwork = () => {
    switchToCorrectNetwork();
  };

  // Renders
  return (
    <Container
      maxW="container.lg"
      centerContent
      py="10"
      justifyContent="center"
    >
      <Badge colorScheme="purple" variant="subtle" rounded="md">
        ⚠️ Contract functions to be used on network: <code>rinkeby</code>{" "}
      </Badge>
      {!!connection.network && (
        <p>
          <strong>Current Network:</strong>{" "}
          <code>{connection?.network ?? "Unknown"}</code>
        </p>
      )}

      <Box alignItems="center" mt="auto">
        {loading && <Progress size="lg" isIndeterminate />}
        <Heading fontSize="6xl" fontWeight="extrabold">
          Grande Jogo
        </Heading>
      </Box>

      {connected ? (
        <Center>
          <Badge variant="outline" my="5%">
            Click the button again to disconnect the wallet.
          </Badge>
        </Center>
      ) : null}
      <Center my="5%">
        <ConnectWallet />
      </Center>

      <Box mt="5%">
        <Grid templateColumns="repeat(3, 1fr)" width="100%" gap={6}>
          {!!connected &&
            hasNFT > 0 &&
            HEROES_METADATA.map((classHeroProps) => (
              <GridItem key={classHeroProps.heroIndex} w="100%">
                <HeroCard {...classHeroProps} />
                <Button
                  w="100%"
                  mt="5%"
                  onClick={async () =>
                    await handleClick(classHeroProps.heroIndex)
                  }
                >
                  Mint
                </Button>
              </GridItem>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
