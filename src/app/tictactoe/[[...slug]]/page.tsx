'use client'
import { useEffect, useState } from 'react'
import { useReadLocalStorage } from 'usehooks-ts'
import Game from '../game'

export default function TicTacToe({ params }: { params: { slug?: string } }) {
    const [token, setToken] = useState<string | null>(null)

    if (process.env.NEXT_PUBLIC_WS_API_URL == null) {
        console.error('NEXT_PUBLIC_WS_API_URL not set')
    }
    const real_token = useReadLocalStorage<string | null>('session')
    useEffect(() => setToken(real_token), [real_token])

    return (
        <>
            <div className="items-center self-center pb-28">
                <div className="flex flex-col">
                    {!token ? <h3>sign in to play</h3> : <Game token={token} slug={params.slug} />}
                </div>
            </div>
        </>
    )
}
