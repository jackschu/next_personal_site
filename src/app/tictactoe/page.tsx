'use client'
import { useEffect, useMemo, useState } from 'react'

export default function TicTacToe() {
    const [board, setBoard] = useState<(boolean | null)[]>(Array(9).fill(null))
    const [token, setToken] = useState<string | null>(null)
    const isMyPlayerX = true

    useEffect(() => {
        setToken(localStorage.getItem('session'))
    }, [])

    const ws = useMemo(() => {
        if (token) {
            if (process.env.NEXT_PUBLIC_WS_API_URL == null) {
                console.error('NEXT_PUBLIC_WS_API_URL not set')
            } else {
                const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_API_URL, [token])
                ws.onmessage = (msg) => {
                    const data = msg.data as string
                    console.log(data)
                    setBoard(data.split('').map((x) => (x === ' ' ? null : x === 'X')))
                }
                return ws
            }
        }
    }, [token])

    const onClick = (i: number) => {
        //        const newBoard = [...board]
        //newBoard[i] = isMyPlayerX
        if (ws && ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({ action: 'sendmessage', data: `${i}` }))
        }
        //        setBoard(newBoard)
    }

    const getButton = (isX: boolean | null, idx: number) => {
        return (
            <button key={idx} onClick={() => onClick(idx)}>
                <div className="text-6xl">{board[idx] === null ? '_' : board[idx] ? 'X' : 'O'}</div>
            </button>
        )
    }

    return (
        <>
            <div className="self-center pb-28">
                <div className="grid grid-flow-col grid-rows-3 gap-2">
                    {board.map((isX, i) => getButton(isX, i))}
                </div>
            </div>
        </>
    )
}
