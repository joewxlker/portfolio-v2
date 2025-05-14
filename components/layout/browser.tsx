import Image from "next/image";
import { FC, ReactNode } from "react";

export const BrowserFrame: FC<{ children: ReactNode; url?: string }> = ({ children, url }) => {
  return (
    <div className="flex flex-col w-full h-fit max-w-[95vw]">
      <div className="py-1 px-2 w-full flex flex-row items-center gap-2 dark:bg-zinc-800 bg-stone-500">
        <div className="h-3 aspect-square rounded-full border-container bg-green-400"/>
        <div className="h-3 aspect-square rounded-full border-container bg-yellow-400"/>
        <div className="h-3 aspect-square rounded-full border-container bg-red-400"/>
      </div>
      <div className="w-full dark:bg-zinc-900 bg-white border-b-container flex flex-row gap-3 py-1 px-2">
        <Image src="/icons/chevron_white.svg" className="invert dark:invert-0 opacity-70 -scale-x-100" alt="" height={10} width={7}/>
        <Image src="/icons/chevron_white.svg" className="invert dark:invert-0 opacity-70" alt="" height={10} width={7}/>
        <Image src="/icons/refresh.svg" alt="" className="invert-0 dark:invert opacity-70" height={10} width={10}/>
        <input disabled className="flex-1 h-full rounded-md bg-black/20 dark:text-white/50 text-black/50 font-semibold font-sans text-xs px-2" defaultValue={url ?? ''} />
        <Image src="/icons/dots.svg" className="invert-0 dark:invert opacity-70" alt="" height={7} width={7}/>
      </div>
      <div className="w-full aspect-video relative">
        {children}
      </div>
    </div>
  )
}