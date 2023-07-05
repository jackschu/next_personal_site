'use client'
import { useState } from 'react'

export default function TicTacToe() {
    const [board, setBoard] = useState<(boolean | null)[]>(Array(9).fill(null))
    const isMyPlayerX = true

    const onClick = (i: number) => {
        const newBoard = [...board]
        newBoard[i] = isMyPlayerX
        setBoard(newBoard)
    }

    const getButton = (isX, idx) => {
        return (
            <button key={idx} onClick={() => onClick(idx)}>
                <div className="text-6xl">{isX === null ? '_' : isX ? 'X' : 'O'}</div>
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
