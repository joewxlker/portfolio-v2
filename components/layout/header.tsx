import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

export const Header: FC = () => {
  return (
    <header className="w-full border-b-container px-5">
      <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
      <div className="flex flex-row justify-between items-center py-2 max-w-[2000px] m-auto">
        <Link href="/">
          <Image src="/logo.png" alt="" height={25} width={50}/>
        </Link>
        <Link href="/#contact" className="button-primary glow">
          Contact Me
        </Link>
      </div>
    </header>
  )
}