'use client'
import { useEffect, useMemo, useState } from 'react'
import { useCopyToClipboard, useReadLocalStorage } from 'usehooks-ts'
import { generateId } from 'zoo-ids'

export default function TicTacToe({ params }: { params: { slug?: string } }) {
    const [board, setBoard] = useState<(boolean | null)[]>(Array(9).fill(null))
    const [roomId, setRoomId] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const isMyPlayerX = true
    const real_token = useReadLocalStorage<string | null>('session')
    useEffect(() => setToken(real_token), [real_token])

    const ws = useMemo(() => {
        if (token) {
            if (process.env.NEXT_PUBLIC_WS_API_URL == null) {
                console.error('NEXT_PUBLIC_WS_API_URL not set')
            } else {
                const roomSuffix = params.slug ? `?roomId=${params.slug}` : undefined
                const wsURL = `${process.env.NEXT_PUBLIC_WS_API_URL}${roomSuffix ? roomSuffix : ''}`
                const ws = new WebSocket(wsURL, [token])
                ws.onopen = (_ev) => {
                    ws.send(JSON.stringify({ action: 'getroominfo', data: `` }))
                }
                ws.onmessage = (msg) => {
                    const data = JSON.parse(msg.data)
                    console.log(data)
                    const setBoardData = (data: string) =>
                        setBoard(data.split('').map((x: string) => (x === ' ' ? null : x === 'X')))

                    switch (data.message) {
                        case 'gameUpdate':
                            if (data.board && typeof data.board === 'string')
                                setBoardData(data.board)
                            else {
                                console.error('failed to parse game Update')
                            }
                            return
                        case 'gameInfo':
                            if (data.roomId && typeof data.roomId === 'string')
                                setRoomId(data.roomId)
                            else console.error('failed to parse game Update')

                            if (data.boardState && typeof data.boardState === 'string')
                                setBoardData(data.boardState)
                            return
                        default:
                            console.error(`unrecognized message type ${data.message}`)
                    }
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

    const [value, copy] = useCopyToClipboard()
    return (
        <>
            <div className="items-center self-center pb-28">
                <div className="flex flex-col">
                    {!token && <h3>sign in to play</h3>}
                    {roomId && <h3>{`room id: ${roomId}`}</h3>}
                    <div className="mt-4 self-center">
                        <div className="inline-grid grid-flow-col grid-rows-3 gap-2">
                            {board.map((isX, i) => getButton(isX, i))}
                        </div>
                    </div>
                    {roomId && (
                        <div className="mt-10 flex flex-col">
                            <button
                                onClick={() => {
                                    if (window === undefined) {
                                        return
                                    }
                                    copy(`${window.location.host}/tictactoe/${roomId}`)
                                }}
                                className="mt-3 h-7 self-center rounded-full bg-secondary-button px-2 text-sm lg:h-12 lg:px-4 lg:text-base"
                            >
                                copy link
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
