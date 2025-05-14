import { PlaceHolder } from "./placeholder";

export const NftFormLoader: React.FC = () => {
    return (
        <>
            <div className="flex-1 h-full">
                <div className="rounded-4xl aspect-video relative h-full overflow-hidden">
                    <PlaceHolder />
                </div>
            </div>
            <div className="lg:max-w-[400px] flex flex-col items-stretch justify-between gap-5 font-loader">
                <h3 className="text-gradient-grey xl:text-left lg:text-left text-center xl:text-3xl lg:text-3xl text-xl font-bold px-2">Digital Business Card</h3>
                <p className="lg:text-xl text-lg font-thin">This on-chain NFT acts as a minimalist, Ethereum-based digital business card. It demonstrates ERC-721 token design, smart contract deployment, and wallet-connected UI.</p>
                <p className="lg:text-xl text-lg font-thin">Mint your own to connect, collaborate, or just say you were here.</p>
                <div className="flex flex-col gap-3 items-stretch">
                    <div className="input-primary">
                        <p className="opacity-50 px-2">Mint to: 0xE51d12D...</p>
                    </div>
                    <div className={`w-full px-5 h-12 button-primary-disabled`}>
                        <p className="opacity-50">Connect Wallet</p>
                    </div>
                </div>
            </div>
        </>
    );
};