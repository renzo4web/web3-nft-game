import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { EpicGame__factory } from "@/typechain";
import { ethers } from "ethers";
import * as React from "react";
import { HEROES_METADATA } from "../contants/Hero.metadata";
import { HeroeSelection } from "../components/HeroeSelection";

const hasEthereum =
  typeof window !== "undefined" && typeof window.ethereum !== "undefined";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//const contractAddress = "0xB57e8771F56792f27335916454eCed62B8a62060";

function notifyAttack() {
  toast.success("Heroe Minted!", {
    position: toast.POSITION.TOP_CENTER,
  });
}

function notifyError() {
  toast.error("Unable to mint", {
    position: toast.POSITION.TOP_CENTER,
  });
}

export default function Web() {
  const router = useRouter();
  const [heroName, setHeroName] = React.useState("");
  const account = useAccount();

  const { data: nftHolders } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    functionName: "nftHolders",
    args: [account?.address],
    enabled: !!account?.address,
  });
  const hasNft = Number(nftHolders?.toString?.()) >= 1;

  /* Mint Hero */
  const { write } = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: EpicGame__factory.abi,
    functionName: "mintHero",
    onSuccess() {
      notifyAttack();
      router.push("/play");
    },
    onError() {
      notifyError();
    },
  });

  React.useEffect(() => {
    if (hasNft) {
      router.push("/play");
    }
  }, [hasNft, router]);

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
                <HeroeSelection
                  key={imageURI}
                  src={imageURI}
                  alt={classHero}
                  onClick={async () => {
                    write({
                      args: [i, heroName, imageURI],
                      overrides: {
                        value: ethers.utils.parseEther("0.003"),
                      },
                    });
                  }}
                  account={account}
                  heroName={heroName}
                />
              ))}
            </div>
          </>
        </main>
      </div>
    </>
  );
}
