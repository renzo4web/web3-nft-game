import {useCheckLocalChain} from "./useCheckLocalChain";
import {useAccount, useNetwork} from "wagmi";
import {chain as chains} from "@wagmi/core";
import {useEffect} from "react";
import {useRouter} from "next/router";

export function useCheckIsValidChain(redirectTo: string) {
    const {isLocalChain} = useCheckLocalChain()
    const account = useAccount()
    const {chain: currentChain} = useNetwork()
    const router = useRouter()
    const isRightNetwork = isLocalChain ? (currentChain?.id === chains.localhost.id) : (currentChain?.id === chains.sepolia.id)


    useEffect(() => {
        if (!isRightNetwork || !account) {
            //router.push(redirectTo)
        }
    }, [isRightNetwork, account, router])

    return isRightNetwork
}