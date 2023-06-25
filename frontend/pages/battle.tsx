import {ExternalLinkIcon} from "@chakra-ui/icons";
import NextLink from "next/link";
import {
    Box,
    Button,
    Text,
    Center,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    Link,
    SimpleGrid,
    Spacer,
    VStack
} from "@chakra-ui/react";
import {useRouter} from "next/router";

function Battle() {
    const router = useRouter()

    return <Container maxW={"container.lg"} py={20} alignItems={"center"}>
        <SimpleGrid boxShadow='xs' border={"purple"} p={5} rounded={"xl"} borderWidth={"thin"} alignItems={"center"}
                    columns={{base: 1, md: 2}} spacing={3}>
            <Image
                boxSize="500px"
                width={"100%"}
                rounded={"xl"}
                src={"https://res.cloudinary.com/dsdziwljt/image/upload/v1687651376/953b3417-cd23-4a3e-b5bc-8e702c39d7fa_nqcsfi.jpg"}
            />
            <VStack height={"100%"}>
                <Heading fontFamily={"serif"} textAlign={"center"}>Legend Unleashed</Heading>
                <Spacer/>
                <Box px={5}>
                    <Text fontFamily={"sans-serif"} color={"gray.400"} fontSize={"xl"} textAlign={"center"}>
                        Embark on an epic blockchain NFT adventure where you can choose from three unique roles. These
                        heroes, represented as rare NFTs, come alive with their own stats and abilities, forever tied to
                        your wallet. Mint your hero, then face the formidable Boss, each strike impacting your hero's
                        stats
                    </Text>
                </Box>
                <Spacer/>
                <Button onClick={() => router.push("/")} mt={"auto"} colorScheme={"purple"} width={"90%"}>Play</Button>
            </VStack>
        </SimpleGrid>
        <Center mt={10}>
            <HStack alignItems={"center"}>
                <Link href='https://chakra-ui.com' isExternal>
                    Twitter <ExternalLinkIcon mx='2px'/>
                </Link>
                <Link href='https://chakra-ui.com' isExternal>
                    Github <ExternalLinkIcon mx='2px'/>
                </Link>
            </HStack>
        </Center>
    </Container>

}

export default Battle;