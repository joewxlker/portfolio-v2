import { Address } from "@/lib/wagmi";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { PlaceHolder } from "./placeholder";

interface TokenMetadata {
    name: string,
    description: string,
    image: string,
    attributes: { trait_type: string, value: string }[]
}

export const NFT: FC<{ tokenId: number, nftAddress: Address, chain: "sepolia" }> = async ({ tokenId, nftAddress, chain }) => {
    const token = await fetch(`${process.env.METADATA_SERVER_URL}/api/metadata/${tokenId}`)
        .then(data => data.json() as Promise<TokenMetadata>)
        .catch(console.error);

    return (
        <Link 
            href={`https://testnets.opensea.io/assets/${chain}/${nftAddress}/${tokenId}`} 
            target="_blank">
                <div className="glow rounded-4xl aspect-video relative h-full overflow-hidden">
                    {token ? <Image src={token.image} alt="" fill objectFit="cover" /> : <PlaceHolder />}
                </div>
        </Link>
    )
}