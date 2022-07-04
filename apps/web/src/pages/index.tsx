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
import { toast } from "react-toastify";

const hasEthereum =
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";

//const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractAddress = "0x8Ee56Ce44140246392efc85a9B6A842ad6a98Fdb";

export default function Web() {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>();
  const [heroName, setHeroName] = React.useState("");
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

  /* Mint Hero */
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

  async function handleSubmit(payload: any[]) {
    try {
      if (hasEthereum) {
        const tx = await write({
          args: payload,
          overrides: {
            value: ethers.utils.parseEther("0.003"),
          },
        });
        setStatus("loading...");

        if (tx.data) {
          const receipt = await tx.data.wait();
          if (receipt.status === 1) {
            toast.success("Heroe Minted!", {
              position: toast.POSITION.TOP_CENTER,
            });
            router.push("/play");
          }
          setStatus("complete");
        }
      }
    } catch (error) {
      toast.error("Unable to mint", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      <div className="max-w-lg mt-36 mx-auto text-center px-4">
        <Head>
          <title>Start</title>
        </Head>

        <main className="space-y-8">
          <>
            <h1 className="text-4xl font-semibold mb-8">NFT Game</h1>
            <p>Store Value : {currentStore} </p>
            <p>transaction status : {status} </p>

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
                    <Button
                      onClick={async () =>
                        await handleSubmit([i, heroName, imageURI])
                      }
                      className="disabled:bg-blue-400 w-full  disabled:cursor-not-allowed"
                      type="submit"
                      disabled={
                        account?.address === undefined || !heroName.trim()
                      }
                    >
                      Mint
                    </Button>
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
    </>
  );
}
