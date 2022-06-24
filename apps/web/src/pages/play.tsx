import { Button, WalletConnectModal } from "ui";
import Head from "next/head";
import {
  useContractWrite,
  useAccount,
  useContractEvent,
  useContractRead,
  useContract,
  useSigner,
} from "wagmi";
import { Storage, EpicGame__factory } from "@/typechain";
import { ethers } from "ethers";
import Image from "next/image";
import * as React from "react";
import { HEROES_METADATA } from "../contants/Hero.metadata";

const hasEthereum =
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Play() {
  const [{ data: signer }] = useSigner();
  const [{ data: account }] = useAccount();

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    signerOrProvider: signer,
  });

  const [{}, write] = useContractWrite<Storage>(
    {
      addressOrName: contractAddress,
      contractInterface: EpicGame__factory.abi,
    },
    "mintHero",
    {
      overrides: {},
    }
  );

  useContractEvent(
    {
      addressOrName: contractAddress,
      contractInterface: EpicGame__factory.abi,
    },
    "CreatedHero",
    (event) => console.log("soy un evento", event)
  );

  const { data: epicGameData } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: EpicGame__factory.abi,
    },
    "nftHolders",
    {
      args: account?.address,
      watch: true,
    }
  );

  React.useEffect(() => {
    console.log("DATRA", epicGameData);

    const effect = async () => {
      try {
        if (contract !== null) {
          const hasNft = await contract?.nftHolders?.(account.address);
          console.log("kk", await contract);
          console.log("hasNft", hasNft.toString());
        }
      } catch (error) {
        console.info(error);
      }
    };

    effect();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    classHeroIndex: number
  ) {
    e.preventDefault();

    const heroName = e.target[0].value;

    if (hasEthereum) {
      const tx = await write({
        args: [classHeroIndex, heroName, HEROES_METADATA[classHeroIndex]],
        overrides: {
          value: ethers.utils.parseEther("0.003"),
        },
      });
      if (tx.data) {
        const receipt = await tx.data.wait();
        if (receipt.status === 1) {
          console.log("RECEPEIT");
          const hasNft = await contract?.nftHolders?.(account.address);
          console.log("hasNft", hasNft.toString());
        }
      }
    }
  }

  return (
    <div className="max-w-lg mt-36 mx-auto text-center px-4">
      <Head>
        <title>Play</title>
      </Head>

      <main className="space-y-8">
        <>
          <h1 className="text-4xl font-semibold mb-8">Arena</h1>

          <div className="space-y-8">
            <div className="flex flex-col space-y-4">
              <WalletConnectModal />
            </div>
          </div>
        </>
      </main>
    </div>
  );
}
