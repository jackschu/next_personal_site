import Link from 'next/link'
import { generateId } from 'zoo-ids'

type Props = {
    url: string
    newtab: boolean
    title: string
    description: string
}

function SingleLink({ url, newtab, title, description }: Props) {
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

export default function HomeLinks() {
    const roomId = generateId(Date.now(), { caseStyle: 'titlecase' })
    return (
        <div className="mb-0 grid text-center lg:grid-cols-4 lg:text-left">
            <SingleLink
                title="github"
                newtab={true}
                url="https://github.com/jackschu"
                description="explore other projects made by me."
            />
            <SingleLink
                title="tic-tac-toe"
                newtab={false}
                url={`/tictactoe/${roomId}`}
                description="i'm proving out an architecture, come play a game"
            />
            {/* <SingleLink
                title="blog"
                url="/"
                description="lorem ipsum is the best, but i hope my content will be better."
            /> */}
            <SingleLink
                title="directions"
                newtab={false}
                url="/"
                description="parking instructions are included (maybe)"
            />
            <SingleLink
                title="version 1"
                newtab={true}
                url="http://v0.jackschumann.com"
                description="my site had a proto-site, you can go check it out."
            />
        </div>
    )
}
