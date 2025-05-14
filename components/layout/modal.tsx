"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react"

export const Modal: FC<{ children: ReactNode, headerItems?: ReactNode }> = ({ children, headerItems }) => {
    const router = useRouter();
    const onDismiss = () => router.back();

    return (
        <div className="fixed h-screen w-screen top-0 z-50 backdrop-blur-sm fade-in">
          <div className="w-fit max-w-screen h-full ml-auto shadow-xl shadow-black/50 dark:bg-[#1a1813] z-20 relative">
            <div className="w-full flex flex-row p-3 gap-5">
                <button className="button-primary opacity-80 hover:opacity-100" onClick={onDismiss}>
                    <Image src="/icons/x-mark.svg" className="dark:invert opacity-80" alt="" height={20} width={20} />
                </button>
                {headerItems}
            </div>
            {children}
          </div>
          <div className="absolute inset-0 z-10" onClick={onDismiss}/>
        </div>
    )
}