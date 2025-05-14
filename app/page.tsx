import { EmailForm } from "@/components/email/form";
import { BrowserFrame } from "@/components/layout/browser";
import { Divider } from "@/components/layout/divider";
import { MobileFrame } from "@/components/layout/iphone";
import { Section } from "@/components/layout/section";
import { NFT } from "@/components/nft/display";
import { Ethereum } from "@/components/nft/ethereum";
import MintForm from "@/components/nft/form";
import { NftFormLoader } from "@/components/nft/loader";
import { NftServiceGate } from "@/components/nft/service-gate";
import { RepositoryDisplay } from "@/components/repo/display";
import { RepoLoader } from "@/components/repo/loader";
import { RepoServiceGate } from "@/components/repo/service-gate";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const EXPERIENCE = [
  { id: "angular", imageUrl: "/experience/angular.svg" },
  { id: "nextjs", imageUrl: "/experience/nextjs.svg" },
  { id: "react", imageUrl: "/experience/react.svg" },
  { id: "rust", imageUrl: "/experience/rust.svg" },
  { id: "solidity", imageUrl: "/experience/solidity.svg" },
  { id: "typescript", imageUrl: "/experience/typescript.svg" },
];

export default function Home() {
  return (
    <main id="main-content" className="w-full flex flex-col items-center justify-start h-fit">
      <div id="hero" className="w-full relative max-w-[2000px] min-h-[80vh] border-x-container overflow-hidden container">
        <div className="flex flex-col items-center justify-start w-[800px] max-w-[90vw] m-auto pt-40 xl:pb-[600px] lg:pb-[500px] pb-[400px] gap-5 z-10">
          <p className="text-4xl text-gradient-grey">Joseph Walker</p>
          <h1 className="text-gradient xl:text-8xl lg:text-7xl text-6xl pb-2 text-center font-body font-heading">Full-Stack Engineer</h1>
          <p className="xl:text-xl text-lg text-center px-10">Building seamless user experiences for decentralized apps.</p>
          <div className="flex flex-row gap-2">
            <Link href="https://github.com/joewxlker" target="_blank" title="github" className="glow rounded-lg flex flex-row gap-2 button-primary px-2 py-1 items-center">
              <Image src="/icons/github.svg" alt="" className="invert" height={20} width={20} />
              <p className="text-lg">Github</p>
            </Link>
            <Link href="https://www.linkedin.com/in/joe-walker-89312a22a/" title="linkedin" target="_blank" className="glow rounded-lg flex flex-row gap-2 button-primary px-2 py-1 items-center">
              <Image src="/icons/linkedin.svg" alt="" className="invert" height={20} width={20} />
              <p className="text-lg">Linkedin</p>
            </Link>
          </div>
        </div>
        <div className="backdrop-blur-[100px] absolute inset-0 -z-10"/>
        <div className="shape-primary-lg absolute top-40 left-0 -translate-y-[50%] -translate-x-[50%] opacity-10 -z-20" />
        <div className="shape-secondary-lg absolute bottom-20 right-20 translate-x-[50%] opacity-30 -z-20" />
      </div>
      <Divider/>
      <Section id="front-end" backgroundPosition="center">
        <div className="absolute top-0 right-0 flex flex-row gap-2 p-5">
          <Link href="/code/joewxlker/zagreus" title="source-code" className="p-1 aspect-square flex items-center group justify-center rounded-md border-container">
            <Image src="/icons/code.svg" className="group-hover:opacity-100 transition-opacity duration-300 dark:invert opacity-50" alt="" height={20} width={20} />
          </Link>
          <Link href="https://zagreus.vercel.app" target="_blank" title="preview" className="p-1 aspect-square flex items-center group justify-center rounded-md border-container">
            <Image src="/icons/globe.svg" className="group-hover:opacity-100 transition-opacity duration-300 dark:invert opacity-50" alt="" height={20} width={20} />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="px-5 py-1 border-container rounded-full">
            <p className="xl:text-xl text-lg text-center text-thin">Token Swap Platform</p>
          </div>
          <h2 className="text-center xl:text-6xl lg:text-5xl text-4xl text-gradient font-heading pb-5">Fluent in Modern Front-End Tools</h2>
          <p className="xl:text-center lg:text-xl text-lg font-thin 2xl:w-2/3 xl:w-1/2 lg:w-1/2 w-full lg:text-left text-center">Zagreus is a privacy-focused, cross-chain crypto swap app powered by a reverse-proxied API built with Next.js to shield user metadata.</p>
        </div>
        <div className="relative xl:w-5/6 lg:w-5/6 w-full m-auto p-5 flex xl:flex-row lg:flex-row flex-col items-stretch justify-stretch gap-5">
          <div className="flex-1 rounded-lg h-full overflow-clip border-container glow">
            <Link href="https://zagreus.vercel.app/" target="_blank">
              <BrowserFrame url="https://zagreus.vercel.app">
                <Image loading="lazy" src={"/zagswap-light.png"} className="dark:hidden block" alt="project-preview" fill />
                <Image loading="lazy" src={"/zagswap-dark.png"} className="hidden dark:block" alt="project-preview" fill />
              </BrowserFrame>
            </Link>
          </div>
          <div className="absolute 2xl:scale-75 2xl:top-10 2xl:-left-30 xl:top-0 xl:-left-30 xl:scale-50 lg:-top-10 lg:-left-20 lg:scale-50 z-10 xl:block lg:block hidden">
            <MobileFrame url="https://zagreus.vercel.app">
              <Image src="/iphone-mock-dark.png" className="dark:block hidden" alt="" height={572} width={272} />
              <Image src="/iphone-mock-light.png" className="dark:hidden block" alt="" height={572} width={272} />
            </MobileFrame>
          </div>
        </div>
      </Section>
      <Divider/>
      <Section id="technology" backgroundPosition="none">
        <p className="text-center xl:text-xl text-lg text-thin">Technologies I Love</p>
        <div className="xl:w-5/6 lg:w-5/6 m-auto flex flex-row flex-wrap justify-evenly gap-5 xl:py-20 lg:py-20 py-10 w-full">
          {EXPERIENCE.map(({ id, imageUrl }) => (
            <Image key={id} src={imageUrl} className="brightness-50 dark:brightness-75 xl:scale-100 lg:scale-100 scale-75" alt="" height={60} width={180} />
          ))}
        </div>
      </Section>
      <Divider/>
      <Section id="nft" backgroundPosition="diagonal">
        <div className="absolute top-0 right-0 flex flex-row gap-2 p-5">
          <Link href="/code/joewxlker/solana_web_token" title="source-code" className="p-1 aspect-square flex items-center group justify-center rounded-md border-container">
            <Image src="/icons/code.svg" className="group-hover:opacity-100 transition-opacity duration-300 dark:invert opacity-50" alt="" height={20} width={20} />
          </Link>
          <Link href="/" title="smart-contract" className="p-1 aspect-square flex items-center group justify-center rounded-md border-container">
            <Image src="/icons/globe.svg" className="group-hover:opacity-100 transition-opacity duration-300 dark:invert opacity-50" alt="" height={20} width={20} />
          </Link>
        </div>
        <div className="xl:w-5/6 lg:w-5/6 w-full m-auto flex flex-col gap-5">
          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="px-5 py-1 border-container rounded-full">
              <p className="text-center xl:text-xl text-lg text-thin">On-Chain Identity Card (ERC-721)</p>
            </div>
            <h2 className="text-gradient text-center xl:text-6xl lg:text-5xl text-4xl font-heading w-full">Ethereum Based</h2>
          </div>
          <div className="flex xl:flex-row lg:flex-row flex-col gap-5 items-stretch justify-center w-full px-5">
            <Suspense fallback={<NftFormLoader/>}>
              <NftServiceGate>
                {(initialState, address, abi) => (<>
                  <div className="flex-1 h-full">
                    <NFT tokenId={0} nftAddress={address} chain="sepolia" />
                  </div>
                  <div className="lg:max-w-[400px] flex flex-col items-stretch justify-between gap-5">
                    <h3 className="text-gradient-grey xl:text-left lg:text-left text-center xl:text-3xl lg:text-3xl text-xl font-bold">Digital Business Card</h3>
                    <p className="lg:text-xl text-lg font-thin">This on-chain NFT acts as a minimalist, Ethereum-based digital business card. It demonstrates ERC-721 token design, smart contract deployment, and wallet-connected UI.</p>
                    <p className="lg:text-xl text-lg font-thin">Mint your own to connect, collaborate, or just say you were here.</p>
                    <Ethereum initialState={initialState}>
                      <MintForm nftAbi={abi} nftAddress={address} />
                    </Ethereum>
                  </div>
                </>)}
              </NftServiceGate>
            </Suspense>
          </div>
        </div>
      </Section>
      <Divider/>
      <Section id="projects" backgroundPosition="bottom">
        <p className="text-center xl:text-xl text-lg text-thin pb-5">My Open Source Work</p>
        <Suspense fallback={<RepoLoader/>}>
          <RepoServiceGate>
            {(repos) => (<RepositoryDisplay repos={repos} />)}
          </RepoServiceGate>
        </Suspense>
      </Section>
      <Divider/>
      <Section id="contact" backgroundPosition="split">
        <div className="px-5 py-1 border-container rounded-full w-fit m-auto lg:mb-0 mb-5">
          <p className="xl:text-xl text-lg text-thin">Rust-Powered Contact API</p>
        </div>
        <div className="flex lg:flex-row-reverse flex-col gap-5">
          <div className="flex-1 flex flex-col lg:items-start items-center justify-center gap-5">
            <h2 className="xl:text-6xl lg:text-5xl text-4xl text-gradient font-heading w-full lg:text-left text-center">Robust Backend Infrastructure</h2>
            <p className="lg:text-xl text-lg font-thin w-full lg:text-left text-center">A lightweight email handling server written in Rust, designed to power the contact form on this portfolio. Built to demonstrate backend development with a focus on performance, security, and integration.</p>
            <p className="lg:text-xl text-lg font-thin w-full lg:text-left text-center">Want to connect? Drop a message — this server’s live and handling requests in real time.</p>
          </div>
          <div className="flex-1 w-full p-5 flex flex-col gap-5">
            <h3 className="text-2xl">Contact Me</h3>
            <EmailForm />
          </div>
        </div>
        <div className="flex flex-col pt-5 items-center gap-2">
          <p className="dark:bg-background-d bg-background shadow-inner dark:shadow-black/50 shadow-black/20 border-container rounded-full px-5 py-2">enquiries@josephwalker.app</p>
        </div>
      </Section>
    </main>
  );
}