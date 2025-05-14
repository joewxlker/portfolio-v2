import Image from "next/image"

export const Spinner = () => {
    return (<Image src="/icons/spinner.svg" className="dark:invert animate-spin opacity-50" alt="" height={20} width={20}/>)
}