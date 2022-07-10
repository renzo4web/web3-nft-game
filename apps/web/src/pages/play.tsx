import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useContractWrite, useAccount, useContract } from "wagmi";
import { EpicGame__factory } from "@/typechain";
import * as React from "react";
import { BOSS_METADATA } from "../contants/Hero.metadata";
import { TokenURI } from "../../type";
import { useRouter } from "next/router";
import NFTCard from "../components/NTFCard";
import { toast } from "react-toastify";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//const contractAddress = "0x8Ee56Ce44140246392efc85a9B6A842ad6a98Fdb";

export default function Play() {
  const router = useRouter();
  const [tokenId, setTokenId] = React.useState(null);
  const [bossGame, setBossGame] = React.useState(null);
  const account = useAccount();
  const [tokenURI, setTokenURI] = React.useState<null | TokenURI>(null);

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
  });

  const { write: attackBoss, isLoading: loadingAttack } = useContractWrite({
    functionName: "attackBoss",
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    args: [Number(tokenId)],
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
  }, [account?.address, contract, router, loadingAttack]);

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
  }, [account?.address, contract, router]);

  React.useEffect(() => {
    if (!!tokenURI && !account?.address) {
      router.push("/");
    }
  }, [tokenURI, account?.address, router]);

  return (
    <div className="max-w-2xl mt-36 mx-auto text-center px-4">
      <Head>
        <title>Play</title>
      </Head>

      <h1 className="text-4xl font-semibold mb-8">Arena</h1>

      <ConnectButton />

      <div className="flex space-x-9">
        {!!tokenURI && <NFTCard {...tokenURI} />}

        <button
          onClick={() => attackBoss()}
          className="text-5xl h-20 my-auto bg-white text-center border-2 border-black-500 rounded-full disabled:bg-grey-400  hover:bg-white disabled:cursor-not-allowed border border-slate-300 hover:border-red-300 align-middle"
          type="submit"
          aria-label="Attack"
          disabled={!account?.address || loadingAttack}
        >
          ⚔️
        </button>

        {!!bossGame && (
          <NFTCard {...bossGame} isBoss={true} image={BOSS_METADATA.imageUrl} />
        )}
      </div>

      <div className="space-y-8 mt-14"></div>
      {/*</main>*/}
    </div>
  );
}
