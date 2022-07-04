import { Button, WalletConnectModal } from "ui";
import Head from "next/head";
import {
  useContractWrite,
  useAccount,
  useContractEvent,
  useContract,
  useSigner,
} from "wagmi";
import { Storage, EpicGame__factory } from "@/typechain";
import { ethers } from "ethers";
import * as React from "react";
import { BOSS_METADATA } from "../contants/Hero.metadata";
import { TokenURI } from "../../type";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import NFTCard from "../components/NTFCard";

const hasEthereum =
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";
//const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contractAddress = "0x8Ee56Ce44140246392efc85a9B6A842ad6a98Fdb";

export default function Play() {
  const router = useRouter();
  const [{ data: signer }] = useSigner();
  const [{ data: account }] = useAccount();
  const [tokenId, setTokenId] = React.useState(null);
  const [bossGame, setBossGame] = React.useState(null);
  const [tokenURI, setTokenURI] = React.useState<null | TokenURI>(null);

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    signerOrProvider: signer,
  });

  /* Attack Boss */
  const [{ loading }, attackBoss] = useContractWrite<Storage>(
    {
      addressOrName: contractAddress,
      contractInterface: EpicGame__factory.abi,
    },
    "attackBoss"
  );

  useContractEvent(
    {
      addressOrName: contractAddress,
      contractInterface: EpicGame__factory.abi,
    },
    "CreatedHero",
    (event) => console.log("soy un evento", event)
  );

  React.useEffect(() => {
    const effect = async () => {
      try {
        if (contract !== null) {
          const boss = await contract?.boss?.();
          setBossGame({
            attackDamage: boss.attackDamage.toString(),
            hp: boss.hp.toString(),
            maxHp: boss.maxHp.toString(),
            name: boss.name,
          });
        }
      } catch (error) {
        console.info(error);
      }
    };

    effect();
  }, [account?.address, contract, router, loading]);

  React.useEffect(() => {
    const effect = async () => {
      try {
        if (contract !== null) {
          const hasNft = await contract?.nftHolders?.(account.address);
          if (Number(hasNft) > 0) {
            setTokenId(hasNft.toString());

            const tokenURI = await contract?.tokenURI?.(
              Number(hasNft.toString())
            );

            fetch(tokenURI)
              .then((res) => res.json())
              .then(setTokenURI);
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        console.info(error);
      }
    };

    effect();
  }, [account?.address, contract, router, loading]);

  React.useEffect(() => {
    if (!!tokenURI && !account?.address) {
      router.push("/");
    }
  }, [tokenURI, account?.address, router]);

  async function handleAttack() {
    console.log(tokenId);

    try {
      if (hasEthereum) {
        const tx = await attackBoss({
          args: Number(tokenId),
          overrides: {
            value: ethers.utils.parseEther("0.003"),
            gasPrice: 8000000000,
          },
        });
        if (tx.data) {
          const receipt = await tx.data.wait();
          if (receipt.status === 1) {
            const hasNft = await contract?.nftHolders?.(account.address);
          }
        }
      }
    } catch (error) {
      console.info(error);
      toast.error(error?.data?.message);
    }
  }

  console.log("TO", tokenURI);
  console.log("BOSS", bossGame);

  return (
    <div className="max-w-2xl mt-36 mx-auto text-center px-4">
      <Head>
        <title>Play</title>
      </Head>

      {/*<main className="space-y-8 max-w-md">*/}
      <h1 className="text-4xl font-semibold mb-8">Arena</h1>

      <div className="flex space-x-9">
        {!!tokenURI && <NFTCard {...tokenURI} />}

        <Button
          onClick={handleAttack}
          className="text-5xl h-20 my-auto bg-white text-center border-2 border-black-500 rounded-full disabled:bg-grey-400  hover:bg-white disabled:cursor-not-allowed border border-slate-300 hover:border-red-300 align-middle"
          type="submit"
          aria-label="Attack"
          disabled={!account?.address}
        >
          ⚔️
        </Button>

        {!!bossGame && (
          <NFTCard {...bossGame} isBoss={true} image={BOSS_METADATA.imageUrl} />
        )}
      </div>

      <div className="space-y-8 mt-14">
        <WalletConnectModal />
      </div>
      {/*</main>*/}
    </div>
  );
}
