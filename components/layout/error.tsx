'use client'
 
import Link from 'next/link';
import { useEffect } from 'react'
 
export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => 
        console.error(error), [error]);
 
    return (
        <div className='flex-1 w-full flex flex-col items-center justify-center gap-5'>
            <p className='text-9xl font-bold opacity-50'>500</p>
            <h2 className='text-2xl'>Something went wrong!</h2>
            <div className='flex flex-row gap-5'>
                <Link className='button-primary !px-10 !py-2' href="/">
                    Home
                </Link>
                <button className='button-secondary !px-10 !py-2' onClick={() => reset()}>
                    Try again
                </button>
            </div>
        </div>
    )
}