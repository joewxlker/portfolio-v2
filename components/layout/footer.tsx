import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

export const Footer: FC = () => {
    return (
      <footer className="w-full border-t-container bg-slate-800/10 dark:bg-black/20 py-10">
        <div className="max-w-[2000px] mx-auto px-5 flex flex-col gap-8 items-center justify-between">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-2xl font-heading text-gradient-grey">Joseph Walker</h3>
            <p className="text-center text-md opacity-70">Building seamless user experiences for decentralized apps.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-5 text-sm">
            <Link href="/" className="hover:text-secondary transition-colors duration-200">Home</Link>
            <Link href="/#contact" className="hover:text-secondary transition-colors duration-200">Contact</Link>
          </nav>
          <div className="flex gap-4">
            <Link href="https://github.com/joewxlker" target="_blank" className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              <Image src="/icons/github.svg" alt="Github" className="dark:invert" height={24} width={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/joe-walker-89312a22a/" target="_blank" className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              <Image src="/icons/linkedin.svg" alt="LinkedIn" className="dark:invert" height={24} width={24} />
            </Link>
          </div>
          <p className="text-xs opacity-50">&copy; {new Date().getFullYear()} Joseph Walker. All rights reserved.</p>
        </div>
      </footer>
    )
}