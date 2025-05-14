'use client'

import { useEffect } from 'react'
 
export default function CodeError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => 
        console.error(error), [error]);
 
    return (
        <div className='flex-[0.5] w-full flex flex-col items-center justify-center gap-5'>
            <h2 className='text-2xl'>Unable to load the selected resource</h2>
            <div className='flex flex-row gap-5'>
                <button className='button-secondary !px-10 !py-2' onClick={() => reset()}>
                    Try again
                </button>
            </div>
        </div>
    )
}