import Image from "next/image"
import { FC, ReactNode } from "react"

export const MobileFrame: FC<{ children: ReactNode, url?: string }> = ({ children, url }) => {
  return (
    <div className="relative mx-auto border-stone-500 dark:border-zinc-800 dark:bg-slate-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl dark:shadow-black/50 shadow-black/10">
      <div className="h-[32px] w-[3px] bg-container dark:bg-zinc-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-container dark:bg-zinc-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-container dark:bg-zinc-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-container dark:bg-zinc-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:border-zinc-800">
      <div className="absolute bottom-0 left-0 right-0 rounded-b-4xl overflow-clip">
        <div className="w-full dark:bg-zinc-900 bg-white primary-border-t flex flex-row gap-3 p-5">
          <Image src="/icons/chevron_white.svg" className="invert dark:invert-0 opacity-70 -scale-x-100" alt="" height={10} width={7}/>
          <Image src="/icons/chevron_white.svg" className="invert dark:invert-0 opacity-70" alt="" height={10} width={7}/>
          <Image src="/icons/refresh.svg" alt="" className="invert-0 dark:invert opacity-70" height={10} width={10}/>
          <input disabled className="flex-1 h-full rounded-md bg-black/20 dark:text-white/50 text-black/50 font-semibold font-sans text-xs px-2" defaultValue={url ?? ''} />
          <Image src="/icons/dots.svg" className="invert-0 dark:invert opacity-70" alt="" height={7} width={7}/>
        </div>
      </div>
        {children}
      </div>
    </div>
  )
}