import { nftContractInfo, nftServerHealth } from '@/lib/nft';
import getConfig from 'next/config';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import type { Abi, Address } from 'viem';
import { cookieToInitialState, State } from 'wagmi';

export const NftServiceGate = async ({ children }: { children: (initialState: State | undefined, address: Address, abi: Abi) => ReactNode }) => {
    const healthy = await nftServerHealth();
    const initialState = cookieToInitialState(getConfig(), (await headers()).get('cookie'));
    
    if (healthy) {
        const contractInfo = await nftContractInfo();
        if (contractInfo) {
            return children(initialState, contractInfo.address, contractInfo.abi);
        } else {
            return (
                <div className="flex flex-col items-center gap-3 border-container rounded-2xl py-30 w-full">
                    <h3 className="text-xl text-white">Unable to show NFT example at the moment</h3>
                    <p>🚧 Contract data unavailable.</p>
                </div>
            )
        }
    }

    return (
        <div className="flex flex-col items-center gap-3 border-container rounded-2xl py-30 w-full">
            <h3 className="text-xl text-white">Unable to show NFT example at the moment</h3>
            <p>🚧 Service unavailable.</p>
        </div>
    )
}