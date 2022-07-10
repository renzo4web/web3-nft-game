import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import {
  useContractWrite,
  useAccount,
  useContractEvent,
  useContractRead,
  useContract,
  useSigner,
} from "wagmi";
import { useRouter } from "next/router";
import { Storage__factory, Storage, EpicGame__factory } from "@/typechain";
import { ethers } from "ethers";
import Image from "next/image";
import * as React from "react";
import { HEROES_METADATA } from "../contants/Hero.metadata";
import { toast } from "react-toastify";

const hasEthereum =
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//const contractAddress = "0x8Ee56Ce44140246392efc85a9B6A842ad6a98Fdb";

export default function Web() {
  const router = useRouter();
  const [heroName, setHeroName] = React.useState("");
  const account = useAccount();
  const [payload, setPayload] = React.useState<null | any[]>(null);

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
  });

  /* Mint Hero */
  const { write } = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    functionName: "mintHero",
    overrides: {
      value: ethers.utils.parseEther("0.003"),
    },
    args: payload,
    onSuccess() {
      toast.success("Heroe Minted!", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/play");
    },
    onError() {
      toast.error("Unable to mint", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  React.useEffect(() => {
    const effect = async () => {
      try {
        if (contract !== null) {
          const hasNft = await contract?.nftHolders?.(account?.address);
          if (Number(hasNft.toString()) >= 1) {
            router.push("/play");
          }
        }
      } catch (error) {
        console.info(error);
      }
    };

    effect();
  }, [account?.address, contract, router]);

  return (
    <>
      <div className="max-w-lg mt-36 mx-auto text-center px-4">
        <Head>
          <title>Start</title>
        </Head>

        <main className="space-y-8">
          <>
            <h1 className="text-4xl font-semibold mb-8">NFT Game</h1>
            <ConnectButton />

            <form className="flex flex-col space-y-4">
              <input
                className="border p-4 text-center"
                placeholder="Your hero's name"
                onChange={({ target }) => setHeroName(target.value)}
                value={heroName}
                type="text"
                min={4}
                required
              />
            </form>

            <div className="flex">
              {HEROES_METADATA.map(({ classHero, imageURI }, i) => (
                <div
                  key={imageURI}
                  className="max-w-sm bg-white  rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex justify-end px-4 pt-4"></div>
                  <div className="flex flex-col items-center pb-10">
                    <Image
                      src={imageURI}
                      alt={classHero}
                      width={200}
                      height={200}
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {classHero}
                    </h5>
                    <button
                      onClick={async () => {
                        setPayload([i, heroName, imageURI]);
                        write();
                      }}
                      className="disabled:bg-blue-400 w-full  disabled:cursor-not-allowed"
                      type="submit"
                      disabled={
                        account?.address === undefined || !heroName.trim()
                      }
                    >
                      Mint
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="flex flex-col space-y-4"></div>
            </div>
          </>
        </main>
      </div>
    </>
  );
}
