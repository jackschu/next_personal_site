'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { generateId } from 'zoo-ids'

type Props = {
    url: string
    newtab: boolean
    title: string
    description: string
    hasRoomSuffix?: boolean
}

function SingleLink({ url, newtab, title, description, hasRoomSuffix }: Props) {
    const [roomId, setRoomId] = useState<string | null>(null)
    useEffect(() => {
        setRoomId(generateId(Date.now(), { caseStyle: 'titlecase' }))
    })
    if (hasRoomSuffix) {
        url = `url/${roomId}`
    }
    return (
        <Link
            href={url}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target={!newtab ? undefined : '_blank'}
            rel="noopener noreferrer"
        >
            <h2 className={`mb-3 text-2xl font-semibold`}>
                {title}{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm text-muted`}>{description}</p>
        </Link>
    )
}
