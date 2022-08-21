import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import {
  useContractWrite,
  useAccount,
  useContractRead,
  useProvider,
} from "wagmi";
import { EpicGame__factory } from "@/typechain";
import * as React from "react";
import { BOSS_METADATA } from "../contants/Hero.metadata";
import { TokenURI } from "../../type";
import { useRouter } from "next/router";
import NFTCard from "../components/NTFCard";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//const contractAddress = "0xB57e8771F56792f27335916454eCed62B8a62060";

export default function Play() {
  const router = useRouter();
  const [bossGame, setBossGame] = React.useState(null);
  const [hitBossEventList, setHitBossEventList] = useState([]);
  const account = useAccount();
  const provider = useProvider();
  const [tokenURI, setTokenURI] = React.useState<null | TokenURI>(null);

  useEffect(() => {
    const Contract = EpicGame__factory.connect(contractAddress, provider);
    (async () => {
      const hitBossFilter = Contract.filters.HitBoss();

      const logs = await Contract.queryFilter(hitBossFilter);

      setHitBossEventList(
        logs?.map?.((e) => ({
          nft: e.args.tokenId?.toString?.(),
          bossHp: e.args.bossHp?.toString?.(),
          heroeHp: e.args.heroeHp?.toString?.(),
        }))
      );
      console.log(
        logs?.map?.((e) => ({
          nft: e.args.tokenId?.toString?.(),
          bossHp: e.args.bossHp?.toString?.(),
          heroeHp: e.args.heroeHp?.toString?.(),
          // TODO : add time
        }))
      );
    })();

    return () => {
      Contract.removeAllListeners();
    };
  }, []);

  const { data: bossData } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    functionName: "boss",
    watch: true,
  });

  const { data: nftHolders, isLoading: loadingNftHolders } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    functionName: "nftHolders",
    args: [account?.address],
    enabled: !!account?.address,
  });

  const { data: token, isLoading: loadingToken } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    functionName: "tokenURI",
    args: [Number(nftHolders)],
    watch: true,
    enabled: !!Number(nftHolders),
  });

  const { write: attackBoss, isLoading: loadingAttack } = useContractWrite({
    functionName: "attackBoss",
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    args: [Number(nftHolders?.toString?.())],
    onSuccess() {
      toast.success("Boss Attacked!", {
        position: toast.POSITION.TOP_CENTER,
      });
      router.push("/play");
    },
    onError() {
      toast.error("Unable to Attack", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  React.useEffect(() => {
    const effect = async () => {
      try {
        if (loadingAttack) return;
        fetch(token?.toString?.())
          .then((res) => res.json())
          .then(setTokenURI);
      } catch (error) {
        console.info(error);
      }
    };

    effect();
  }, [token, loadingAttack, loadingNftHolders, loadingToken]);

  React.useEffect(() => {
    if (!bossData) {
      return;
    }

    const effect = async () => {
      try {
        setBossGame({
          hp: bossData.at(0).toString?.(),
          maxHp: bossData.at(1).toString?.(),
          attackDamage: bossData.at(2).toString?.(),
          name: bossData.at(-1),
        });
      } catch (error) {
        console.info(error);
      }
    };

    effect();
  }, [bossData, loadingAttack]);

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
      <div className="flex space-x-9 my-3.5">
        {!!tokenURI && <NFTCard {...tokenURI} />}
        <button
          onClick={() =>
            attackBoss({
              args: [Number(nftHolders?.toString())],
            })
          }
          className="text-5xl h-20 my-auto bg-white text-center border-2 border-black-500 rounded-full disabled:bg-grey-400  hover:bg-white disabled:cursor-not-allowed border border-slate-300 hover:border-red-300 align-middle"
          type="submit"
          aria-label="Attack"
          //disabled={!account?.address || loadingAttack}
        >
          ⚔️
        </button>
        {!!bossGame && (
          <NFTCard {...bossGame} isBoss={true} image={BOSS_METADATA.imageUrl} />
        )}
      </div>
      <div className="space-y-8 mt-14">
        {!!hitBossEventList?.length
          ? hitBossEventList.map((e) => (
              <div key={String(e.nft + 1)}>
                <p>#NFT: {e?.nft}</p>
                <p>Boss HP: {e?.bossHp}</p>
                <p>Heroe HP: {e?.heroeHp}</p>
              </div>
            ))
          : "Not events"}
      </div>
    </div>
  );
}
