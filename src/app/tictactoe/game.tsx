'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCopyToClipboard } from 'usehooks-ts'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

export default function Game({ slug, token }: { slug?: string; token: string }) {
    const [board, setBoard] = useState<(boolean | null)[]>(Array(9).fill(null))
    const [roomId, setRoomId] = useState<string | null>(slug ?? null)

    const onClick = (i: number) => {
        if (readyState === 1) {
            sendMessage(JSON.stringify({ action: 'sendmessage', data: `${i}` }))
        }
    }

    const roomSuffix = slug ? `?roomId=${slug}` : undefined
    const wsURL = `${process.env.NEXT_PUBLIC_WS_API_URL}${roomSuffix ? roomSuffix : ''}`
    const router = useRouter()
    const pathname = usePathname()

    const { sendMessage, sendJsonMessage, readyState } = useWebSocket(wsURL, {
        onError: (e) => {
            console.log('err', e)
        },
        protocols: [token],
        onOpen: (_ev) => {
            sendMessage(JSON.stringify({ action: 'getroominfo', data: `` }))
        },
        onMessage: (msg) => {
            const data = JSON.parse(msg.data)
            console.log(data)
            const setBoardData = (data: string) =>
                setBoard(data.split('').map((x: string) => (x === ' ' ? null : x === 'X')))

            switch (data.message) {
                case 'gameUpdate':
                    if (data.board && typeof data.board === 'string') setBoardData(data.board)
                    else {
                        console.error('failed to parse game Update')
                    }
                    return
                case 'gameInfo':
                    if (data.roomId && typeof data.roomId === 'string') {
                        if (slug == null) router.push(pathname + '/' + data.roomId)
                        setRoomId(data.roomId)
                    } else console.error('failed to parse game Update')

                    if (data.boardState && typeof data.boardState === 'string')
                        setBoardData(data.boardState)
                    return
                default:
                    console.error(`unrecognized message type ${data.message}`)
            }
        },
    })

    const getButton = (isX: boolean | null, idx: number) => {
        return (
            <button disabled={readyState != 1} key={idx} onClick={() => onClick(idx)}>
                <div className={`text-6xl ${readyState != 1 && 'text-muted'}`}>
                    {board[idx] === null ? '_' : board[idx] ? 'X' : 'O'}
                </div>
            </button>
        )
    }
    const [_value, copy] = useCopyToClipboard()

    return (
        <>
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
        </>
    )
}
