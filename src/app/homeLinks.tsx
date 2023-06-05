type Props = {
    url: string
    title: string
    description: string
}

function SingleLink({ url, title, description }: Props) {
    return (
        <a
            href={url}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2 className={`mb-3 text-2xl font-semibold`}>
                {title}{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm text-muted`}>{description}</p>
        </a>
    )
}

export default function HomeLinks() {
    return (
        <div className="mb-0 grid text-center lg:grid-cols-4 lg:text-left">
            <SingleLink
                title="github"
                url="https://github.com/jackschu"
                description="explore other projects made by me."
            />
            <SingleLink
                title="blog"
                url=""
                description="lorem ipsum is the best, but i hope my content will be better."
            />
            <SingleLink
                title="directions"
                url=""
                description="parking instructions are included (maybe)"
            />
            <SingleLink
                title="version 1"
                url="http://v0.jackschumann.com"
                description="my site had a proto-site, you can go check it out."
            />
        </div>
    )
}
