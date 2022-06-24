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
import { useRouter } from "next/router";
import { Storage__factory, Storage, EpicGame__factory } from "@/typechain";
import { ethers } from "ethers";
import Image from "next/image";
import * as React from "react";
import { HEROES_METADATA } from "../contants/Hero.metadata";

const hasEthereum =
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Web() {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>();
  const [status, setStatus] = React.useState<"loading..." | "complete">(
    "complete"
  );
  const [currentStore, setCurrentStore] = React.useState("");
  const [{ data: signer }] = useSigner();
  const [{ data: account }] = useAccount();

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    signerOrProvider: signer,
  });

  /* Attack Boss */
  const [{}, write] = useContractWrite<Storage>(
    {
      addressOrName: contractAddress,
      contractInterface: EpicGame__factory.abi,
    },
    "attackBoss",
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

  React.useEffect(() => {
    const effect = async () => {
      try {
        if (contract !== null) {
          const hasNft = await contract?.nftHolders?.(account?.address);
          console.log("kk", await contract);
          console.log("hasNft");
          if (Number(hasNft.toString()) >= 1) {
            router.push("/play");
          }
        }
      } catch (error) {
        console.info(error);
      }
    };

    effect();
  }, [account, contract, router]);

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
      setStatus("loading...");
      if (tx.data) {
        const receipt = await tx.data.wait();
        if (receipt.status === 1) {
          console.log("RECEPEIT");
          const hasNft = await contract?.nftHolders?.(account.address);
          console.log("hasNft", hasNft.toString());
        }
        setStatus("complete");
      }
    }
  }

  return (
    <div className="max-w-lg mt-36 mx-auto text-center px-4">
      <Head>
        <title>Start</title>
      </Head>

      <main className="space-y-8">
        <>
          <h1 className="text-4xl font-semibold mb-8">NFT Game</h1>
          <p>Store Value : {currentStore} </p>
          <p>transaction status : {status} </p>

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
                    alt={"heheh"}
                    width={200}
                    height={200}
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {classHero}
                  </h5>
                  <form onSubmit={(e) => handleSubmit(e, i)}>
                    <div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Hero Name"
                        required
                      />
                    </div>

                    <Button
                      className="disabled:bg-blue-400 w-full  disabled:cursor-not-allowed"
                      type="submit"
                      disabled={account?.address === undefined}
                    >
                      Mint
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>

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
