import type { Abi } from 'viem';
import { Address } from './wagmi';

interface NftContractInfo {
    address: Address;
    abi: Abi;
    chain: "sepolia";
}

export const nftContractInfo = async () => {
    const info = await fetch(`${process.env.METADATA_SERVER_URL!}/api/contract`)
        .then(async res => await res.json())
        .catch(console.error);

    return info as NftContractInfo | undefined;
}

export const nftServerHealth = async () => {
    const health = await fetch(`${process.env.METADATA_SERVER_URL!}/api/health/ready`)
        .catch(console.error);

    if (health?.ok) { return true; }

    return false;
}