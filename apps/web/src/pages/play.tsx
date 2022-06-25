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
import { TokenURI } from "../../type";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const hasEthereum =
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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

  async function handleAttack() {
    console.log(tokenId);

    try {
      if (hasEthereum) {
        const tx = await attackBoss({
          args: Number(tokenId),
          overrides: {
            value: ethers.utils.parseEther("0.003"),
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

  return (
    <div className="max-w-lg mt-36 mx-auto text-center px-4">
      <Head>
        <title>Play</title>
      </Head>

      <main className="space-y-8">
        <>
          <h1 className="text-4xl font-semibold mb-8">Arena</h1>

          <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Image
              src={
                "https://assets.reedpopcdn.com/doom-eternal-marauder-beat-fast-7021-1585323777581.jpg/BROK/thumbnail/1200x900/quality/100/doom-eternal-marauder-beat-fast-7021-1585323777581.jpg"
              }
              alt="Game Boss"
              width="500"
              height="300"
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {bossGame?.name}
              </h5>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Attack Damage: {bossGame?.attackDamage}
              </h5>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                HP: {bossGame?.hp} / {bossGame?.maxHp}
              </h5>
            </div>
            <button
              onClick={handleAttack}
              type="button"
              className="text-blue-700 w-full hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Attack
            </button>
          </div>

          {!!tokenURI && (
            <>
              <h2 className="text-4xl font-semibold mb-8">{tokenURI?.name}</h2>
              <h2 className="text-4xl font-semibold mb-8">{tokenURI?.Class}</h2>
              {tokenURI.attributes.map(({ trait_type, value, max_value }) => (
                <div key={trait_type}>
                  <p>{trait_type}</p>
                  <p>Current: {value}</p>
                  {!!max_value && <p>Max: {max_value}</p>}
                </div>
              ))}
            </>
          )}

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
